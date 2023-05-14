import { providers } from 'ethers';
import { LazlosPizzaShop__factory } from '../typechain-types';
import { getIngredients, saveWinningPizzas } from '../services/pizza';
import { uniq } from 'lodash';
import axios from 'axios';
import { Pizza } from 'types';
import dotenv from 'dotenv';
dotenv.config()

const getUnclaimedPayouts = async () => {
    console.log("WHATSTED ");
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
    let unclaimedPayouts = [];
    console.log("payoutAddress: ", payoutAddresses);
  
    for (const payoutAddress of payoutAddresses){
      console.log(`Processing payouts for address: ${payoutAddress}`);
    
      const allAddressPayouts = await Promise.all(
        (payoutHistory[payoutAddress] || []).map(async (payout: any) => {
          const isPaidOut = await contract.isPaidOutForBlock(payoutAddress, payout.block);
          if (!isPaidOut) {
            return { address: payoutAddress, payout };
          }
          return null;
        }),
      );
      console.log(`Total payouts found for address: ${payoutAddress} are: ${allAddressPayouts.length}`);
    
      const unclaimedAddressPayouts = allAddressPayouts.filter((payout: any) => !!payout);
      console.log(`Unclaimed payouts for address: ${payoutAddress} are: ${unclaimedAddressPayouts.length}`);
    
      unclaimedPayouts.push(unclaimedAddressPayouts);
      
      const total: number = unclaimedPayouts.reduce(
        (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
        0,
      );
      const addressPayouts: number = unclaimedAddressPayouts.reduce(
        (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
        0,
      );
      console.log(`Total payouts found for address: ${payoutAddress} are: ${addressPayouts}`);
      console.log(`Total payouts now are  are: ${total}`);
    }
  
    return unclaimedPayouts;
  };

  const getUnclaimedPayouts2 = async () => {
    console.log("WHATSTED ");
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
    let unclaimedPayouts = [];
    
    const processPayoutsForAddress = async (payoutAddress) => {
      console.log(`Processing payouts for address: ${payoutAddress}`);
    
      const allAddressPayouts = await Promise.all(
        (payoutHistory[payoutAddress] || []).map(async (payout: any) => {
          const isPaidOut = await contract.isPaidOutForBlock(payoutAddress, payout.block);
          if (!isPaidOut) {
            return { address: payoutAddress, payout };
          }
          return null;
        }),
      );
      console.log(`Total payouts found for address: ${payoutAddress} are: ${allAddressPayouts.length}`);
    
      const unclaimedAddressPayouts = allAddressPayouts.filter((payout: any) => !!payout);
      console.log(`Unclaimed payouts for address: ${payoutAddress} are: ${unclaimedAddressPayouts.length}`);
    
      return unclaimedAddressPayouts;
    }
    
    unclaimedPayouts = await Promise.all(payoutAddresses.map(processPayoutsForAddress));
    unclaimedPayouts = unclaimedPayouts.flat();
    console.log(unclaimedPayouts.length);
    const total: number = unclaimedPayouts.reduce(
        (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
        0,
      );
    console.log(`Total payouts from asynch now are  are: ${total}`);
    
  
    return unclaimedPayouts;
  };
  const getUnclaimedPayouts3 = async () => {
    console.log("3 ");
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

    const allPromises = [];
    let unclaimedPayouts = [];

    for (let i = 0; i < payoutAddresses.length; i += 1) {
    allPromises.push(...(payoutHistory[payoutAddresses[i]] || []).map((payout: any) => {
        return contract.isPaidOutForBlock(payoutAddresses[i], payout.block).then((isPaidOut) => {
        if (!isPaidOut) {
            return { address: payoutAddresses[i], payout };
        }
        return null;
        });
    }));
    }

    await Promise.all(allPromises)
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
        (prev, current) => (prev + (current.payout?.payout_amount ? current.payout?.payout_amount : 0)),
        0,
      );
    console.log(`Total payouts from now are 2 are: ${total}`);
    
  };

  const getUnclaimedPayouts4 = async () => {
    console.log("4 ");
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

    const payoutStatsPerAddress = {};
  let totalPayouts = 0;
  let totalClaimed = 0;
  let totalUnclaimed = 0;
  
  for (let i = 0; i < payoutAddresses.length; i += 1) {
    const address = payoutAddresses[i];
    const payoutList = payoutHistory[address] || [];
    
    let addressTotal = 0;
    let addressClaimed = 0;
    let addressUnclaimed = 0;
  
    for (const payout of payoutList) {
      //console.log(payout);
      const isPaidOut = await contract.isPaidOutForBlock(address, payout.block);
      const payoutAmount = payout.payout_amount || 0;
  
      addressTotal += payoutAmount;
  
      if (isPaidOut) {
        addressClaimed += payoutAmount;
      } else {
        addressUnclaimed += payoutAmount;
      }
    }
  
    payoutStatsPerAddress[address] = {
      total: addressTotal,
      claimed: addressClaimed,
      unclaimed: addressUnclaimed,
    };
  
    totalPayouts += addressTotal;
    totalClaimed += addressClaimed;
    totalUnclaimed += addressUnclaimed;
  }
  
  console.log(payoutStatsPerAddress);
  console.log(`Total payouts: ${totalPayouts}`);
  console.log(`Total claimed: ${totalClaimed}`);
  console.log(`Total unclaimed: ${totalUnclaimed}`);
  
  
    // const total: number = unclaimedPayouts.reduce(
    //     (prev, current) => (prev + current.payout?.payout_amount ? current.payout?.payout_amount : 0),
    //     0,
    //   );
    // console.log(`Total payouts from now are  are: ${total}`);
    
  };

  //getUnclaimedPayouts();
//getUnclaimedPayouts2();

getUnclaimedPayouts3();
//getUnclaimedPayouts4();

  

