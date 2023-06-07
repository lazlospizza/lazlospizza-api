import { Request, Response } from 'express';
import * as pizzaService from '../services/pizza';
import axios from 'axios';

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const { pizzas, ingredients } = await pizzaService.getStoredPizzas();
    return res.send({ pizzas, ingredients });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getRandomPizza = async (req: Request, res: Response) => {
  try {
    const { address } = req.query;
    if (!address) throw 'missing address';

    const randomPizzaRes = await axios.get(`${process.env.PYTHON_API_URL}/random_pizza?address=${address}`);
    return res.send(randomPizzaRes.data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPizzaImage = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;

    const pizzaImageRes = await axios.get(`${process.env.PYTHON_API_URL}/tokens/${tokenId}/pizza_image.png`, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', 'image/png');
    return res.send(pizzaImageRes.data);
  } catch (error) {
    return res.status(500).json(error);
  }
};
