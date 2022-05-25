import { providers } from 'ethers';
import { LazlosPizzaShop__factory } from '../typechain-types';
import { getIngredients } from './pizza';
import { uniq } from 'lodash';
import axios from 'axios';
import { Pizza } from 'types';
import { ETH } from '../constants';
import { S3Folder, uploadJsonToS3 } from './s3';

export const getArtistUnclaimedPayout = async () => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';

  const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
  const contract = LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, infuraProvider);
  const ingredients = await getIngredients();
  const artists: string[] = uniq(ingredients.map(({ artist }) => artist));

  let unclaimedTotal = 0;
  for (let i = 0; i < artists.length; i += 1) {
    try {
      const artist = artists[i];
      const _allowedWithdrawalAmount = await contract.artistAllowedWithdrawalAmount(artist);
      const allowedWithdrawalAmount = parseInt(_allowedWithdrawalAmount._hex, 16);
      if (allowedWithdrawalAmount > 0) {
        unclaimedTotal += allowedWithdrawalAmount / ETH;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return unclaimedTotal;
};

export const getUnclaimedPayouts = async () => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  if (!process.env.PAYOUT_DB) throw 'missing payout db';

  const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
  const contract = LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, infuraProvider);

  const res = await axios.get(process.env.PAYOUT_DB);

  const payoutHistory = res.data;
  const payoutAddresses = Object.keys(payoutHistory);
  const unclaimedPayouts = [];

  for (let i = 0; i < payoutAddresses.length; i += 1) {
    const payouts = payoutHistory[payoutAddresses[i]]
      ?.map(async (payout: any) => {
        const isPaidOut = await contract.isPaidOutForBlock(payoutAddresses[i], payout.block);
        if (isPaidOut) {
          return { address: payoutAddresses[i], payout };
        }
        return null;
      })
      .filter((payout: any) => !!payout);

    unclaimedPayouts.push(...payouts);
  }

  return unclaimedPayouts;
};

export const calculatePayouts = async () => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db';

  const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB);
  const winningPizzas = winningPizzasRes.data as Pizza[];

  const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
  const _balance = await infuraProvider.getBalance(process.env.MAIN_CONTRACT_ADDRESS);
  const balance = parseInt(_balance._hex, 16) / ETH;
  const unclaimedPayouts = await getUnclaimedPayouts();

  const unclaimedPayoutsTotal: number = unclaimedPayouts.reduce(
    (prev, current) => prev + (current.payout?.payout_amount ? current.payout?.payout_amount / ETH : 0),
    0,
  );
  const artistUnclaimedTotal = await getArtistUnclaimedPayout();

  const prizePool = balance - unclaimedPayoutsTotal - artistUnclaimedTotal;
  const developerRewards = prizePool * 0.0025;
  const creatorRewards = prizePool * 0.0075;
  const rarityRewards = prizePool * 0.01;

  const now = Math.floor(Date.now() / 1000);

  const payouts = [
    {
      address: process.env.CREATOR_WALLET,
      payout_amount: creatorRewards,
      reason: 'Creator',
      timestamp: now,
    },
    {
      address: process.env.DEVELOPER_WALLET,
      payout_amount: developerRewards,
      reason: 'Developer',
      timestamp: now,
    },
  ];

  const rarityRewardPayouts = winningPizzas.map(({ owner, tokenId, rarity }) => ({
    address: owner,
    payout_amount: rarityRewards / winningPizzas.length,
    reason: 'Rarity reward',
    timestamp: now,
    token_id: tokenId,
    rarity: rarity,
  }));

  await uploadJsonToS3([], S3Folder.winning_pizzas);

  return [...payouts, ...rarityRewardPayouts];
};
