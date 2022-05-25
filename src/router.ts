import express, { Router } from 'express'
import routes from 'routes'

const createRouter = (): Router => {
  const restRouter = express.Router()
  restRouter.use(routes)
  return restRouter
}

export default createRouter
