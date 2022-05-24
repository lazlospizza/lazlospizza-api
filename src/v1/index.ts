import fs from 'fs'
import path from 'path'
import express, { Router } from 'express'

const createRouter = (): Router => {
  const restRouter = express.Router()

  const normalizedPath = path.join(__dirname, 'routes')

  fs.readdirSync(normalizedPath).forEach(async (file) => {
    const route = await import(`./routes/${file}`)
    restRouter.use(route.default)
  })

  return restRouter
}

export default createRouter
