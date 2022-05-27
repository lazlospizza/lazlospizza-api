import axios from 'axios';
import { Request, Response } from 'express';
import { Pizza } from '../types';
import * as payoutService from '../services/payout';

export const getPayouts = async (req: Request, res: Response) => {
  try {
    const payouts = await payoutService.calculatePayouts(0);
    return res.send({ payouts });
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
    const winningPizzas = winningPizzasRes.data as Pizza[];

    return res.send({ winningPizzas });
  } catch (error) {
    return res.status(500).json(error);
  }
};
