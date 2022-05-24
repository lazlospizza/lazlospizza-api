import axios from 'axios'
import { Request, Response } from 'express'
import { Pizza } from '../../types'
import * as payoutService from '../../services/payout'

export const getPayouts = async (req: Request, res: Response) => {
  try {
    const payouts = await payoutService.calculatePayouts()
    return res.send({ payouts })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const getWinningPizzas = async (req: Request, res: Response) => {
  try {
    if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db'
    const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB)
    const winningPizzas = winningPizzasRes.data as Pizza[]

    return res.send({ winningPizzas })
  } catch (error) {
    return res.status(500).json(error)
  }
}
