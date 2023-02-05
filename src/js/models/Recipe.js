/** @format */

import axios from 'axios';
import { app_id, app_key } from '../config';
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://api.edamam.com/api/recipes/v2/${this.id}?type=public&app_id=${app_id}&app_key=${app_key}`
      );
      this.label = res.data.recipe.label;
      this.source = res.data.recipe.source;
      this.image = res.data.recipe.image;
      this.url = res.data.recipe.url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  }

  calcTime() {
    // Assuming that we need 30 minutes for each 4 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 4);
    this.time = periods * 30;
  }

  calcServing() {
    this.serving = 3;
  }
  parseIngredients() {
    const unitLong = [
      'tablespoon',
      'tablespoons',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoons',
      'cup',
      'pounds',
      'pound',
      'units',
      'milliliter',
    ];
    const unitShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'lb',
      'lb',
      'unit',
      'ml',
    ];
    const ingredient = this.ingredients.map((el) => {
      let measure, number;
      if (el.measure == null) {
        measure = 'Q.S.';
      } else {
        // Turn upper case units to lower case units
        measure = el.measure.toLowerCase();
        unitLong.forEach((el, index) => {
          // Turn long units to short units
          measure = measure.replace(el, unitShort[index]);
          // Remove <> symbol from units
          measure = measure.replace(/<*>*/g, '');
        });
      }
      if (el.quantity == 0) {
        number = 1;
      } else {
        number = parseFloat(el.quantity.toFixed(2));
      }
      let ing = { unit: measure, text: el.food, quantity: number };
      return ing;
    });
    this.ingredients = ingredient;
  }

  updateIngredients(type) {
    // Servings

    const newServ = type === 'dec' ? this.serving - 1 : this.serving + 1;

    // Ingredients
    this.ingredients.forEach(
      (el) =>
        (el.quantity = parseFloat(
          el.quantity * (newServ / this.serving)
        ).toFixed(2))
    );

    this.serving = newServ;
  }
}
