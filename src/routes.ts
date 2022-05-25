import express from 'express'
import { getPizzaImage, getPizzas, getRandomPizza } from './controllers/pizzas'
import {
  getPayoutForAddress,
  getPayouts,
  getWinningPizzas,
} from './controllers/payouts'

const router = express.Router()

// pizzas

router.route('/pizzas').get(getPizzas)
router.route('/random-pizza').get(getRandomPizza)
router.route('/tokens/:tokenId/pizza_image.png').get(getPizzaImage)

// rewards

router.route('/payouts').get(getPayouts)
router.route('/payouts/:address').get(getPayoutForAddress)
router.route('/winning_pizzas').get(getWinningPizzas)

export default router
