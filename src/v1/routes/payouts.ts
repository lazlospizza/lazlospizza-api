import express from 'express'
import { getPayouts, getWinningPizzas } from '../controllers/payouts'

const router = express.Router()

router.route('/payouts').get(getPayouts)
router.route('/winning_pizzas').get(getWinningPizzas)

export default router
