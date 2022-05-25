import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import restRouter from './router'

dotenv.config()

const TEN_MB = 10 * 1024 * 1024

const app = express()

// configuration stuff first
app.use(express.json({ limit: TEN_MB }))
app.use(express.urlencoded({ extended: false, limit: TEN_MB }))

app.use(cors())

// setup rest
app.use('/', restRouter())

// errors & edge cases
app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(err.status || 500)
  res.json({
    err: {
      message: err.message,
    },
  })
})

app.use((req, res, next) => {
  const error = new Error('Route Not Found')
  error.message = '404'
  next(error)
  return res.status(404).send({
    message: 'Route Not Found',
  })
})

export default app
