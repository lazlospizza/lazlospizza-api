export const enum IngredientType {
  base = 'Base',
  sauce = 'Sauce',
  cheese = 'Cheese',
  meat = 'Meat',
  topping = 'Topping',
}

export interface Ingredient {
  tokenId: number
  name: string
  price: number
  balance: number
  supply: number
  ingredientType: IngredientType
  image?: string
  rarity?: number
  numberOfPizzas?: number
}

export interface IngredientGroup {
  name: string
  type?: IngredientType
  min?: number | null
  max?: number | null
  ingredients: Ingredient[]
}

export interface Pizza {
  tokenId?: number
  base?: Ingredient | null
  sauce?: Ingredient | null
  cheeses?: Ingredient[]
  meats?: Ingredient[]
  toppings?: Ingredient[]
  image?: string
  owner?: string
  allIngredients: Ingredient[]
  additionalIngredients?: Ingredient[]
  burnIngredients?: Ingredient[]
  rarity?: number
}
