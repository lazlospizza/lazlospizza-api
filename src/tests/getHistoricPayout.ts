import { providers } from 'ethers';
import { LazlosPizzaShop__factory } from '../typechain-types';
import { getIngredients } from '../services/pizza';
import { uniq } from 'lodash';
import axios from 'axios';
import { Pizza } from 'types';
import dotenv from 'dotenv';
import fs from "fs";
dotenv.config()

const getUnclaimedPayoutsForBlock = async (block: number, payoutHistory: {}) => {
    console.log("getting Payouts for Block: ", block);
    if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
  
    //const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
    const alchemyProvider = new providers.AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_ID);
    
    const contract = LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, alchemyProvider);
  
    const payoutAddresses = Object.keys(payoutHistory);
    let unclaimedPayouts = [];
    console.log("payoutAddress: ", payoutAddresses);
  
    for (const payoutAddress of payoutAddresses){
      console.log(`Processing payouts for address: ${payoutAddress}`);
    
      const allAddressPayouts = await Promise.all(
        (payoutHistory[payoutAddress] || []).map(async (payout: any) => {
          const isPaidOut = await contract.isPaidOutForBlock(payoutAddress, payout.block, { blockTag: block });
          if (!isPaidOut) {
            return { address: payoutAddress, payout };
          }
          return null;
        }),
      );
      //console.log(`Total payouts found for address: ${payoutAddress} are: ${allAddressPayouts.length}`);
    
      const unclaimedAddressPayouts = allAddressPayouts.filter((payout: any) => !!payout);
      //console.log(`Unclaimed payouts for address: ${payoutAddress} are: ${unclaimedAddressPayouts.length}`);
    
      unclaimedPayouts.push(unclaimedAddressPayouts);
      
      const total: number = unclaimedPayouts.reduce(
        (prev, current) => (prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0)),
        0,
      );
      const addressPayouts: number = unclaimedAddressPayouts.reduce(
        (prev, current) => (prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0)),
        0,
      );
      console.log(`Total payouts found for address: ${payoutAddress} are: ${addressPayouts}`);
      console.log(`Total payouts now are  are: ${total}`);
    }
  
    return unclaimedPayouts;
  };

  const getUnclaimedPayoutsForBlockV2 = async (block: number, payoutHistory: {}) => {
    console.log("3 ");
    if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
  
    const alchemyProvider = new providers.AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_ID);
    
    const contract = LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, alchemyProvider);
  
    const payoutAddresses = Object.keys(payoutHistory);
    console.log("payoutAddress: ", payoutAddresses);
  
    const allPromises = [];
    let unclaimedPayouts = [];

    for (let i = 0; i < payoutAddresses.length; i += 1) {
    allPromises.push(...(payoutHistory[payoutAddresses[i]] || []).map((payout: any) => {
        return contract.isPaidOutForBlock(payoutAddresses[i], payout.block, { blockTag: block }).then((isPaidOut) => {
        if (!isPaidOut) {
            return { address: payoutAddresses[i], payout };
        }
        return null;
        });
    }));
    }

    const payouts = await Promise.all(allPromises)
    .then((allAddressPayouts) => {
        const unclaimedAddressPayouts = allAddressPayouts.filter((payout: any) => !!payout);
        const total: number = unclaimedAddressPayouts.reduce(
            (prev, current) => (prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0)),
            0,
          );
          console.log(`Total payouts from now are  are: ${total}`);
        unclaimedPayouts.push(...unclaimedAddressPayouts);
        return unclaimedAddressPayouts; // return this here
    })
    // .then((unclaimedAddressPayouts) => {
    //     // Now you can access unclaimedAddressPayouts here
    //     const total: number = unclaimedAddressPayouts.reduce(
    //         (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
    //         0,
    //       );
    //       console.log(`Total payouts from now are  are: ${total}`);
    // })
    .catch((error) => {
        console.error("Error in Promise.all: ", error);
    });

    const total: number = unclaimedPayouts.reduce(
        (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
        0,
      );
    console.log(`Total payouts from now are 2 are: ${total}`);
    return payouts ? payouts : [];
    
  };


const getArtistUnclaimedPayoutForBlock = async (block: number, ingredients: any[]) => {
    if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  
    const alchemyProvider = new providers.AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_ID);
    
    const contract = LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, alchemyProvider);
    const artists: string[] = uniq(ingredients.map(({ artist }) => artist));
  
    let unclaimedTotal = 0;
    for (let i = 0; i < artists.length; i += 1) {
      try {
        const artist = artists[i];
        const _allowedWithdrawalAmount = await contract.artistAllowedWithdrawalAmount(artist, {blockTag: block});
        const allowedWithdrawalAmount = parseInt(_allowedWithdrawalAmount._hex, 16);
        if (allowedWithdrawalAmount > 0) {
          unclaimedTotal += allowedWithdrawalAmount;
        }
      } catch (e) {
        //console.log(e);
      }
    }
    return unclaimedTotal;
  };

  export const calculatePayouts = async (block: number, winners: any[], payoutHistory: {}, ingredients: any[]) => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db';
  if (!process.env.PAYOUT_DB) throw 'missing winning payout db';

  console.log('calculate payouts');

  const alchemyProvider = new providers.AlchemyProvider(process.env.ETH_NETWORK, process.env.ALCHEMY_ID);
  const _balance = await alchemyProvider.getBalance(process.env.MAIN_CONTRACT_ADDRESS, block);
  const balance = parseInt(_balance._hex, 16);
  const unclaimedPayouts = await getUnclaimedPayoutsForBlockV2(block, payoutHistory);

  const unclaimedPayoutsTotal: number = unclaimedPayouts.reduce(
    (prev, current) => (prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0)),
    0,
  );

  console.log({ unclaimedPayoutsTotal });

  const artistUnclaimedTotal = await getArtistUnclaimedPayoutForBlock(block, ingredients);

  console.log({ artistUnclaimedTotal });

  const prizePool = balance - unclaimedPayoutsTotal - artistUnclaimedTotal;
  const developerRewards = Math.round(prizePool * 0.0025);
  const creatorRewards = Math.round(prizePool * 0.0075);
  const rarityRewards = Math.round(prizePool * 0.01);

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

  const rarityRewardPayouts = winners
  .filter(({ address }) => address !== process.env.CREATOR_WALLET && address !== process.env.DEVELOPER_WALLET)
  .map(({ address, tokenId, rarity, timestamp }) => ({
    address: address,
    payout_amount: Math.floor(rarityRewards / (winners.length - 2)),
    reason: 'Rarity reward',
    timestamp: timestamp,
    token_id: tokenId,
    rarity: rarity,
  }));

  const payouts = [...creatorPayouts, ...rarityRewardPayouts];
  return payouts;
};

const reformatInput = (data: {}) => {
    let result = {};

    for (let address in data) {
        // if(address == process.env.DEVELOPER_WALLET  || address == process.env.CREATOR_WALLET) {
        //     continue;
        // }
        for (let entry of data[address]) {
            let block = entry.block;
            
            // Create a new object with address, tokenId, and timestamp properties
            let newEntry = {
                address: address,
                tokenId: entry.token_id,
                timestamp: entry.timestamp,
                rarity: entry.rarity
            };
            
            // If there is already an entry for the block, push to the array
            if (result[block]) {
                result[block].push(newEntry);
            }
            // Otherwise, create a new array with the newEntry object
            else {
                result[block] = [newEntry];
            }
        }
    }
    return result;
}

const main = async () => {
    //load data from axios
    let payoutHistory = {};

    try {
      const res = await axios.get(process.env.PAYOUT_DB);
      payoutHistory = res.data;
    } catch (e) {
      console.log(e);
    }
    //reformat data
    const ref = reformatInput(payoutHistory);
    const ingredients = await getIngredients();
    //get new rewards
    const blocks = Object.keys(ref);
    let result = {};
    console.log(blocks)
    for(let i = 0; i < blocks.length; i += 1) {
        let block = blocks[i];
        console.log(block)
        console.log(parseInt(block));
        let payouts = await calculatePayouts(parseInt(block), ref[block], result, ingredients);
        for (let i = 0; i < payouts.length; i += 1) {
            const payout = payouts[i];
            const entry = {
              block,
              payout_amount: payout.payout_amount,
              token_id: payout.token_id ?? null,
              timestamp: payout.timestamp,
            };
            if (result[payout.address]) {
              if (!result[payout.address].find(_payout => _payout.block === block && _payout.token_id === payout.token_id)) {
                result[payout.address].push(entry);
              }
            } else {
                result[payout.address] = [entry];
            }
        }
    console.log(result);
    fs.writeFile('outputV2.json', JSON.stringify(result, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    }
}

main();

