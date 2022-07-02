import express, { Request, Response } from 'express';
import { getPizzaImage, getPizzas, getRandomPizza } from './controllers/pizzas';
import {
  getCalculatedPayouts,
  getBlockCalculatedPayouts,
  getPayoutForAddress,
  getPayouts,
  getWinners,
  getWinningPizzas,
} from './controllers/payouts';

const router = express.Router();

// health check

router.route('/').get((req: Request, res: Response) => {
  res.status(200);
  res.send("Lazlo's Pizza API");
});

// pizzas

router.route('/pizzas').get(getPizzas);
router.route('/random_pizza').get(getRandomPizza);
router.route('/tokens/:tokenId/pizza_image.png').get(getPizzaImage);

// rewards

router.route('/payouts').get(getPayouts);
router.route('/payout').get(getPayoutForAddress);
router.route('/calculate-payouts').get(getCalculatedPayouts);
router.route('/calculate-block-payouts').get(getBlockCalculatedPayouts);
router.route('/winning_pizzas').get(getWinningPizzas);
router.route('/winners').get(getWinners);

export default router;
