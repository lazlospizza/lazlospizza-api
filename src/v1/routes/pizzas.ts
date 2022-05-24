import express from 'express'
import { getPizzas } from '../controllers/pizzas'

const router = express.Router()

router.route('/pizzas').get(getPizzas)

export default router
