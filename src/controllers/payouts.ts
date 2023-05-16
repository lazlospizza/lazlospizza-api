import axios from 'axios';
import { Request, RequestHandler, Response } from 'express';
import { blockNumber } from 'services/ethers';
import { calculatePayouts } from 'services/payout';
import memoryCache from 'memory-cache';

export const getCalculatedPayouts = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    const payouts = await calculatePayouts(blockNumber || 10762980, false); //changed this because otherwise it's too easy to write new payouts

    return res.send(payouts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getBlockCalculatedPayouts: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    const { block } = req.query;
    const cacheKey = `cache:calculatedBlockPayout:${block}`;
    const cachedBody = memoryCache.get(cacheKey);
    if (cachedBody) {
      return res.send(cachedBody);
    }
    const payouts = await calculatePayouts(parseInt(block as string), false);
    memoryCache.put(cacheKey, payouts, 1000 * 60 * 60 * 4);
    return res.send(payouts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPayouts = async (req: Request, res: Response) => {
  try {
    if (!process.env.PAYOUT_DB) throw 'missing payout db';
    let payouts: any = [];
    try {
      const { address } = req.query;
      const payoutsRes = await axios.get(process.env.PAYOUT_DB);
      if (address) {
        payouts = payoutsRes.data?.[`${address}`];
      } else {
        payouts = payoutsRes.data;
      }
    } catch (e) {
      console.log(e);
    }

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
