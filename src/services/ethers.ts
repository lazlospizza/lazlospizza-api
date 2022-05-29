import { BigNumber, providers } from 'ethers';
import { LazlosIngredients__factory, LazlosPizzas__factory } from '../typechain-types';
import { saveWinningPizzas } from './pizza';
import { calculatePayouts } from './payout';

const ZeroAddress = '0x0000000000000000000000000000000000000000';
export let blockNumber = 0;

export const onMintOrBurn = (from: string, to: string) => {
  if (from === ZeroAddress || to === ZeroAddress) {
    console.log('something got minted or burned');
    try {
      saveWinningPizzas();
    } catch (e) {
      console.log(e);
    }
  }
};

export const initListeners = () => {
  if (!process.env.MAIN_CONTRACT_ADDRESS) throw 'missing main contract address';
  if (!process.env.PIZZA_CONTRACT_ADDRESS) throw 'missing pizza contract address';
  if (!process.env.INGREDIENTS_CONTRACT_ADDRESS) throw 'missing ingredients contract address';

  console.log('Connecting to', process.env.ETH_NETWORK);
  console.log('Main contract address', process.env.PIZZA_CONTRACT_ADDRESS);

  const infuraProvider = new providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
  const pizzaContract = LazlosPizzas__factory.connect(process.env.PIZZA_CONTRACT_ADDRESS, infuraProvider);
  const ingredientsContract = LazlosIngredients__factory.connect(process.env.INGREDIENTS_CONTRACT_ADDRESS, infuraProvider);

  pizzaContract.on('Transfer', (from: string, to: string, id: BigNumber, txn) => onMintOrBurn(from, to));
  ingredientsContract.on('TransferBatch', (operator: string, from: string, to: string, ids: BigNumber[], amounts: BigNumber[], txn) =>
    onMintOrBurn(from, to),
  );
  ingredientsContract.on('TransferSingle', (operator: string, from: string, to: string, ids: BigNumber[], amounts: BigNumber[], txn) =>
    onMintOrBurn(from, to),
  );
  infuraProvider.on('block', async _blockNumber => {
    blockNumber = _blockNumber;
    console.log(blockNumber);
    if (!process.env.PAYOUT_BLOCK_INTERVAL || !Number(process.env.PAYOUT_BLOCK_INTERVAL)) return null;
    const blockInterval = Number(process.env.PAYOUT_BLOCK_INTERVAL);
    if (blockNumber / blockInterval === Math.floor(blockNumber / blockInterval)) {
      const payouts = await calculatePayouts(blockNumber, true);
      console.log(payouts);
    }
  });
};
