import { BigNumber, providers } from 'ethers'
import { Ingredient, IngredientType, Pizza } from '../types'
import {
  LazlosIngredients__factory,
  LazlosPizzas__factory,
} from '../typechain-types'
import { ETH, ZERO_ADDRESS } from '../constants'
import { uploadJsonToS3, S3Folder } from './s3'
import axios from 'axios'

export enum IngredientKey {
  'name' = 'name',
  'ingredientType' = 'ingredientType',
  'artist' = 'artist',
  'price' = 'price',
  'supply' = 'supply',
}

export enum PizzaKey {
  'base' = 'base',
  'sauce' = 'sauce',
  'cheeses' = 'cheeses',
  'meats' = 'meats',
  'toppings' = 'toppings',
}

const pizzaKeys = [
  PizzaKey.base,
  PizzaKey.sauce,
  PizzaKey.cheeses,
  PizzaKey.meats,
  PizzaKey.toppings,
]

const ingredientKeys = [
  IngredientKey.name,
  IngredientKey.ingredientType,
  IngredientKey.artist,
  IngredientKey.price,
  IngredientKey.supply,
]

const ingredientTypes = [
  IngredientType.base,
  IngredientType.sauce,
  IngredientType.cheese,
  IngredientType.meat,
  IngredientType.topping,
]

export const getIngredients = async () => {
  if (!process.env.INGREDIENTS_CONTRACT_ADDRESS)
    throw 'missing ingredients contract address'

  const infuraProvider = new providers.InfuraProvider(
    process.env.ETH_NETWORK,
    process.env.INFURA_ID,
  )
  const contract = LazlosIngredients__factory.connect(
    process.env.INGREDIENTS_CONTRACT_ADDRESS,
    infuraProvider,
  )
  const _numberOfIngredients = await contract.numIngredients()
  const numberOfIngredients = parseInt(_numberOfIngredients._hex, 16)

  const ingredients = await Promise.all(
    Array.from(Array(numberOfIngredients).keys()).map(async (i) => {
      const tokenId = i + 1
      const _ingredient = await contract.getIngredient(tokenId)
      const uri = await contract.uri(tokenId)
      const ingredient: {
        [key in IngredientKey]:
          | string
          | BigNumber
          | number
          | number[]
          | IngredientType
          | IngredientType[]
      } = { name: '', ingredientType: '', artist: '', price: '', supply: '' }
      for (let i = 0; i < 5; i += 1) {
        if (i === 1) {
          ingredient[ingredientKeys[i]] = ingredientTypes[_ingredient[i]]
        } else if (i === 3) {
          ingredient[ingredientKeys[i]] =
            parseInt((_ingredient[i] as BigNumber)._hex, 16) / ETH
        } else if (i === 4) {
          ingredient[ingredientKeys[i]] = parseInt(
            (_ingredient[i] as BigNumber)._hex,
            16,
          )
        } else {
          ingredient[ingredientKeys[i]] = _ingredient[i]
        }
      }

      const uriString = Buffer.from(uri.split(',')[1], 'base64').toString(
        'ascii',
      )
      const uriJson = JSON.parse(uriString)

      return { ...uriJson, ...ingredient, tokenId }
    }),
  )

  return ingredients
}

export const getPizzas = async () => {
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
  const _numberOfPizzas = await contract.numPizzas()
  const numberOfPizzas = parseInt(_numberOfPizzas._hex, 16)

  const _ingredients = await getIngredients()

  const _pizzas = (
    await Promise.all(
      Array.from(Array(numberOfPizzas).keys()).map(async (i) => {
        const tokenId = i + 1
        const owner = await contract.ownerOf(tokenId)
        if (owner === ZERO_ADDRESS) return null
        const _pizza = await contract.pizza(tokenId)
        const uri = await contract.tokenURI(tokenId)
        const pizza: { [key in PizzaKey]: number | number[] } & {
          allIngredients: number[]
        } = {
          base: 0,
          sauce: 0,
          cheeses: [],
          meats: [],
          toppings: [],
          allIngredients: [],
        }
        for (let i = 0; i < 5; i += 1) {
          pizza[pizzaKeys[i]] = _pizza[i]
          if (i <= 1) {
            if (pizza[pizzaKeys[i]])
              pizza?.allIngredients.push(pizza[pizzaKeys[i]] as number)
          } else {
            if (pizza[pizzaKeys[i]])
              pizza?.allIngredients.push(...(pizza[pizzaKeys[i]] as number[]))
          }
        }

        const uriString = Buffer.from(uri.split(',')[1], 'base64').toString(
          'ascii',
        )
        const uriJson = JSON.parse(uriString)

        return { ...uriJson, ...pizza, tokenId, owner }
      }),
    )
  ).filter((p) => !!p)

  const ingredients: Ingredient[] = _ingredients.map((ingredient) => {
    const numberOfPizzas = _pizzas.filter((pizza) =>
      pizza.allIngredients.find(
        (tokenId: number) => tokenId === ingredient.tokenId,
      ),
    ).length
    const rarity = (numberOfPizzas / _pizzas.length) * 100
    return { ...ingredient, numberOfPizzas, rarity }
  })

  const pizzas = await Promise.all(
    _pizzas.map(async (_pizza) => {
      const pizza: Pizza = { ..._pizza, allIngredients: [] }
      for (let i = 0; i < 5; i += 1) {
        if (i <= 1) {
          pizza[
            pizzaKeys[i] as PizzaKey.base | PizzaKey.sauce
          ] = ingredients.find(
            (ingredient) => ingredient.tokenId === _pizza[pizzaKeys[i]],
          ) as Ingredient
          if (pizza[pizzaKeys[i]])
            pizza?.allIngredients.push(pizza[pizzaKeys[i]] as Ingredient)
        } else {
          pizza[
            pizzaKeys[i] as
              | PizzaKey.cheeses
              | PizzaKey.meats
              | PizzaKey.toppings
          ] = ingredients.filter((ingredient) =>
            ((_pizza[pizzaKeys[i]] as unknown) as number[]).includes(
              ingredient.tokenId,
            ),
          )
          if (pizza[pizzaKeys[i]])
            pizza?.allIngredients.push(...(pizza[pizzaKeys[i]] as Ingredient[]))
        }
      }

      const ingredientsMissing = ingredients
        .filter(
          (ingredient) =>
            ingredient.ingredientType !== IngredientType.base &&
            ingredient.ingredientType !== IngredientType.sauce &&
            !pizza.allIngredients.find((i) => i.tokenId === ingredient.tokenId),
        )
        .map((ingredient) => ({
          ...ingredient,
          rarity: 100 - (ingredient.rarity ?? 0),
        }))

      const rarityIngredients = [...pizza.allIngredients, ...ingredientsMissing]

      const raritySum = rarityIngredients.reduce(
        (prev, current) => prev + (current.rarity ?? 100),
        0,
      )
      const rarity = raritySum / rarityIngredients.length

      return { ...pizza, rarity }
    }),
  )

  return { pizzas, ingredients } as {
    pizzas: Pizza[]
    ingredients: Ingredient[]
  }
}

export const getRarestPizzas = async () => {
  const { pizzas } = await getPizzas()

  let rarestPizzas: Pizza[] = []
  for (let i = 0; i < pizzas.length; i += 1) {
    const pizza = pizzas[i]
    if (pizza?.rarity === undefined) continue
    if (!rarestPizzas.length || pizza.rarity === rarestPizzas[0].rarity) {
      rarestPizzas.push(pizza)
    } else if (
      pizza.rarity &&
      rarestPizzas[0].rarity &&
      rarestPizzas[0].rarity > pizza.rarity
    ) {
      rarestPizzas = [pizza]
    }
  }

  return rarestPizzas
}

export const saveWinningPizzas = async () => {
  if (!process.env.WINNING_PIZZAS_DB) throw 'missing winning pizzas db'
  console.log('getting the winning pizzas')
  const rarestPizzas = await getRarestPizzas()

  const winningPizzasRes = await axios.get(process.env.WINNING_PIZZAS_DB)
  const winningPizzas = winningPizzasRes.data as Pizza[]

  if (
    rarestPizzas[0]?.rarity &&
    winningPizzas[0]?.rarity &&
    rarestPizzas[0].rarity > winningPizzas[0].rarity
  )
    return null

  await uploadJsonToS3(winningPizzas, S3Folder.winning_pizzas)
}
