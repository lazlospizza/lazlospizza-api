import axios from 'axios'
import { providers } from 'ethers'
import mergeImages from 'merge-images'
import { LazlosPizzas__factory } from 'typechain-types'
import { Canvas, Image } from 'canvas'
import fs from 'fs'
import { flatten } from 'lodash'

const savePizzaLayerImage = async (url: string) => {
  const writer = fs.createWriteStream(
    'temp/' +
      url.replace('https://lazlos-pizza.s3.amazonaws.com/pizza_layers/', ''),
  )
  await axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error: any = null
      writer.on('error', (err) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(true)
        }
      })
    })
  })
}

const tableClothImage = () =>
  savePizzaLayerImage(
    'https://lazlos-pizza.s3.amazonaws.com/pizza_layers/table_cloth.png',
  )

const getIngredientLayerImg = async (tokenId: number) =>
  savePizzaLayerImage(
    `https://lazlos-pizza.s3.amazonaws.com/pizza_layers/${tokenId}.png`,
  )

export const pizzaImageFromTokenId = async (tokenId: number) => {
  if (!process.env.PIZZA_CONTRACT_ADDRESS)
    throw 'missing pizza contract address'

  const infuraProvider = new providers.InfuraProvider(
    process.env.ETH_NETWORK,
    process.env.INFURA_ID,
  )
  const contract = LazlosPizzas__factory.connect(
    process.env.PIZZA_CONTRACT_ADDRESS,
    infuraProvider,
  )
  const pizza = await contract.pizza(tokenId)
  const ingredientTokenIds = flatten(pizza).filter((tokenId) => !!tokenId)

  fs.mkdir('temp', (e) => console.log(e))
  await tableClothImage()
  await Promise.all(
    ingredientTokenIds.map((tokenId) => getIngredientLayerImg(tokenId)),
  )
  const image = await mergeImages(
    [
      { src: 'temp/table_cloth.png', x: 0, y: 0 },
      ...ingredientTokenIds.map((tokenId) => ({
        src: `temp/${tokenId}.png`,
        x: 100,
        y: 100,
      })),
    ],
    { Canvas, Image },
  )
  return image
}
