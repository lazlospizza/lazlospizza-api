import http from 'http'
import { initListeners } from 'services/ethers'

import app from './app'

const port = process.env.PORT || 4000
const server = http.createServer(app)

const createServer = async () => {
  try {
    server.listen(port)

    initListeners()

    console.log('Server Running on Port', port)
  } catch (e) {
    console.log('Error Creating Node Server', JSON.stringify(e), e)
  }
}

createServer()

module.exports = server
