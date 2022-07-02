import { providers } from 'ethers';
import { LazlosPizzaShop__factory } from '../typechain-types';
import { getIngredients, saveWinningPizzas } from './pizza';
import { uniq } from 'lodash';
import axios from 'axios';
import { Pizza } from 'types';
import { S3Folder, uploadJsonToS3 } from './s3';
import { ETH } from '../constants';

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
        unclaimedTotal += allowedWithdrawalAmount;
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

  let payoutHistory = {};

  try {
    const res = await axios.get(process.env.PAYOUT_DB);
    payoutHistory = res.data;
  } catch (e) {
    console.log(e);
  }

  const payoutAddresses = Object.keys(payoutHistory);
  const unclaimedPayouts = [];

  for (let i = 0; i < payoutAddresses.length; i += 1) {
    const allAddressPayouts = await Promise.all(
      (payoutHistory[payoutAddresses[i]] || []).map(async (payout: any) => {
        const isPaidOut = await contract.isPaidOutForBlock(payoutAddresses[i], payout.block);
        if (!isPaidOut) {
          return { address: payoutAddresses[i], payout };
        }
        return null;
      }),
    );
    const unclaimedAddressPayouts = allAddressPayouts.filter((payout: any) => !!payout);
    unclaimedPayouts.push(...unclaimedAddressPayouts);
  }

  return unclaimedPayouts;
};

export const calculatePayouts = async (block: number, uploadToS3 = false) => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db';
  if (!process.env.PAYOUT_DB) throw 'missing winning payout db';

  console.log('calculate payouts');

  let winningPizzas: Pizza[] = [];
  try {
    const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB);
    winningPizzas = (winningPizzasRes.data || []) as Pizza[];
  } catch (e) {
    console.log(e);
  }

  console.log(winningPizzas);

  const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
  const _balance = await infuraProvider.getBalance(process.env.MAIN_CONTRACT_ADDRESS);
  const balance = parseInt(_balance._hex, 16);
  const unclaimedPayouts = await getUnclaimedPayouts();

  const unclaimedPayoutsTotal: number =
    unclaimedPayouts.reduce((prev, current) => Number(prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0).toFixed(7)), 0) *
    ETH;

  console.log({ unclaimedPayoutsTotal });

  const artistUnclaimedTotal = await getArtistUnclaimedPayout();

  console.log({ artistUnclaimedTotal });

  const prizePool = balance - unclaimedPayoutsTotal - artistUnclaimedTotal;
  const developerRewards = prizePool * 0.0025;
  const creatorRewards = prizePool * 0.0075;
  const rarityRewards = prizePool * 0.01;

  const now = Math.floor(Date.now() / 1000);

  const creatorPayouts = [
    {
      address: process.env.CREATOR_WALLET,
      payout_amount: creatorRewards,
      reason: 'Creator',
      timestamp: now,
      token_id: null,
    },
    {
      address: process.env.DEVELOPER_WALLET,
      payout_amount: developerRewards,
      reason: 'Developer',
      timestamp: now,
      token_id: null,
    },
  ];

  const rarityRewardPayouts = winningPizzas.map(({ owner, tokenId, rarity }) => ({
    address: owner,
    payout_amount: Math.floor(rarityRewards / winningPizzas.length),
    reason: 'Rarity reward',
    timestamp: now,
    token_id: tokenId,
    rarity: rarity,
  }));

  await saveWinningPizzas(true);

  const payouts = [...creatorPayouts, ...rarityRewardPayouts];

  if (uploadToS3) {
    let payoutsFromDb = {};
    try {
      const payoutDbRes = await axios.get(process.env.PAYOUT_DB);
      payoutsFromDb = payoutDbRes.data;
    } catch (e) {
      console.log(e);
    }
    for (let i = 0; i < payouts.length; i += 1) {
      const payout = payouts[i];
      const entry = {
        block,
        payout_amount: Math.round((payout.payout_amount / ETH) * 1000) / 1000,
        token_id: payout.token_id ?? null,
        timestamp: payout.timestamp,
      };
      if (payoutsFromDb[payout.address]) {
        if (!payoutsFromDb[payout.address].find(_payout => _payout.block === block && _payout.token_id === payout.token_id)) {
          payoutsFromDb[payout.address].push(entry);
        }
      } else {
        payoutsFromDb[payout.address] = [entry];
      }
    }
    await uploadJsonToS3(payoutsFromDb, S3Folder.payouts);
  }

  const winnersRes = await axios.get(process.env.WINNERS_DB);
  const winners = winnersRes.data;
  await uploadJsonToS3([...winningPizzas.map(pizza => ({ ...pizza, rewardedOn: now, block })), ...winners], S3Folder.winners);

  return payouts;
};
