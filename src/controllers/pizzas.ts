import { Request, Response } from 'express';
import web3Utils from 'web3-utils';
import { Wallet } from 'ethers';
import { splitSignature } from 'ethers/lib/utils';
import * as pizzaService from '../services/pizza';
import { pizzaImageFromTokenId } from 'services/images';

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const { pizzas, ingredients } = await pizzaService.getPizzas();
    return res.send({ pizzas, ingredients });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getRandomPizza = async (req: Request, res: Response) => {
  try {
    if (!process.env.PRIVATE_KEY) throw 'missing private key';
    const { address } = req.query;

    const tokenIds = pizzaService.getRandomPizza();
    const timestamp = Math.floor(Date.now() / 1000);

    const hashedMessage = web3Utils.soliditySha3(
      { t: 'address', v: `${address}` },
      { t: 'uint256', v: timestamp },
      { t: 'uint256[]', v: JSON.stringify(tokenIds) },
    );

    if (!hashedMessage) throw 'no hashed message';

    const wallet = new Wallet(process.env.PRIVATE_KEY);
    const flatSignature = await wallet.signMessage(hashedMessage);
    const signature = splitSignature(flatSignature);

    return res.send({
      token_ids: tokenIds,
      address,
      timestamp,
      v: signature.v,
      r: signature.r,
      s: signature.s,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPizzaImage = async (req: Request, res: Response) => {
  try {
    const { tokenId } = req.params;
    const data = await pizzaImageFromTokenId(Number(tokenId));
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(data.replace('data:image/png;base64,', ''), 'base64'));
  } catch (error) {
    return res.status(500).json(error);
  }
};
