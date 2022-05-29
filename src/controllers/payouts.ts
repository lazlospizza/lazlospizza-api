import axios from 'axios';
import { Request, Response } from 'express';
import { blockNumber } from 'services/ethers';
import { calculatePayouts } from 'services/payout';

export const getCalculatedPayouts = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    const payouts = await calculatePayouts(blockNumber, true);

    return res.send(payouts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPayouts = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    const payoutsRes = await axios.get(process.env.PAYOUT_DB);
    const payouts = payoutsRes.data;

    return res.send(payouts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPayoutForAddress = async (req: Request, res: Response) => {
  try {
    const { address, block } = req.query;
    if (!address) throw 'missing address';
    if (!address) throw 'missing block';

    const payoutRes = await axios.get(`${process.env.PYTHON_API_URL}/payout?address=${address}&block=${block}`);
    return res.send(payoutRes.data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getWinningPizzas = async (req: Request, res: Response) => {
  try {
    if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db';
    const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB);
    const winningPizzas = winningPizzasRes.data;

    return res.send(winningPizzas);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getWinners = async (req: Request, res: Response) => {
  try {
    if (!process.env.WINNERS_DB) throw 'missing winners db';
    const winnersRes = await axios.get(process.env.WINNERS_DB);
    const winners = winnersRes.data;

    return res.send(winners);
  } catch (error) {
    return res.status(500).json(error);
  }
};
