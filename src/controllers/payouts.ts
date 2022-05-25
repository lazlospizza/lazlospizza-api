import axios from 'axios';
import { Request, Response } from 'express';
import web3Utils from 'web3-utils';
import { Wallet } from 'ethers';
import { splitSignature } from 'ethers/lib/utils';
import { Pizza } from '../types';
import * as payoutService from '../services/payout';
import { ETH } from '../constants';

export const getPayouts = async (req: Request, res: Response) => {
  try {
    const payouts = await payoutService.calculatePayouts();
    return res.send({ payouts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPayoutForAddress = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    if (!process.env.PRIVATE_KEY) throw 'missing private key';
    const { address, block } = req.query;
    const payoutsRes = await axios.get(process.env.PAYOUT_DB);
    const payoutAmount = payoutsRes.data[`${address}`]?.find((payout: { block: number }) => payout.block === Number(block))?.payout_amount || 0;

    if (!payoutAmount) throw 'no payout amount';

    const payoutAmountEth = payoutAmount * ETH;
    const hashedMessage = web3Utils.soliditySha3(
      { t: 'uint256', v: Number(block) },
      { t: 'address', v: `${address}` },
      { t: 'uint256', v: payoutAmountEth },
    );

    if (!hashedMessage) throw 'no hashed message';

    const wallet = new Wallet(process.env.PRIVATE_KEY);
    const flatSignature = await wallet.signMessage(hashedMessage);
    const signature = splitSignature(flatSignature);

    return res.send({
      block: block,
      address,
      payout_amount: payoutAmount,
      v: signature.v,
      r: signature.r,
      s: signature.s,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getWinningPizzas = async (req: Request, res: Response) => {
  try {
    if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db';
    const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB);
    const winningPizzas = winningPizzasRes.data as Pizza[];

    return res.send({ winningPizzas });
  } catch (error) {
    return res.status(500).json(error);
  }
};
