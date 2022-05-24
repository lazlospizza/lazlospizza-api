import { Request, Response } from 'express'
import * as pizzaService from '../../services/pizza'

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const { pizzas, ingredients } = await pizzaService.getPizzas()
    return res.send({ pizzas, ingredients })
  } catch (error) {
    return res.status(500).json(error)
  }
}
