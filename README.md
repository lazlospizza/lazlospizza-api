# lazlospizza-api

**Rarity cacluation**
The rarity of pizzas in the game based on their ingredients. Rarity is a measure of how common or uncommon an ingredient is across all pizzas. This is accomplished by calculating how frequently each ingredient appears in all pizzas, then assigning a rarity score to each ingredient. These scores are used to compute the rarity of each pizza based on the rarity of its ingredients. The algorithm also takes into account missing ingredients in the pizzas and incorporates them into the rarity calculation.

The rarity calcuation is done in the getPizzas function in src/services/pizza.ts.
In detail, this is done: 
1. Calculating Ingredient Rarity
The ingredients constant is calculated by iterating over each ingredient in _ingredients array. For each ingredient, the code calculates the number of pizzas that use this ingredient. This is done by filtering the _pizzas array to only include pizzas that have the current ingredient in their allIngredients array. The code then calculates a rarity score for each ingredient by dividing the number of pizzas using that ingredient by the total number of pizzas, giving a percentage value. The result is an array of ingredients where each ingredient has an additional numberOfPizzas and rarity property.

2. Building Detailed Pizza Objects
For each pizza in _pizzas, it assigns the detailed ingredient objects to corresponding pizza attributes (base, sauce, cheeses, meats, toppings). The first two ingredients (base and sauce) are unique for each pizza, so they are found using the find() method. The remaining ingredients (cheeses, meats, toppings) can be multiple for each pizza, so they are filtered using the filter() method.

3. Calculating Missing Ingredients
For each pizza, the code then calculates a list of ingredientsMissing by filtering the ingredients that are not used in the current pizza and are not a base or sauce. For each of these missing ingredients, it calculates the rarity as 100 minus the previously calculated rarity.

4. Calculating Pizza Rarity
Next, the code calculates the rarity of each pizza. It combines the pizza's ingredients and the missing ingredients into rarityIngredients array. It then calculates the sum of the rarities of all these ingredients. The rarity of the pizza is then calculated as the average of these rarities, rounded to 3 decimal places.