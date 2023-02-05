/** @format */
import { elements } from './base';
import { limitTitle } from './searchView';
import { Fraction } from 'fractional';

// Clear Recipe View
export const clearRecipe = () => {
  elements.recipeView.innerHTML = '';
};

// Turning float number to fractional numbers by Fractional package
const formatNumber = (count) => {
  if (count) {
    const [int, dec] = count
      .toString()
      .split('.')
      .map((el) => parseInt(el, 10));
    if (!dec) {
      return count;
    } else if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
};

// Function to dedicate ingredients to Each Element of ingredient
const createIngredient = (el) => `
<div class="col-md-6 p-0 pl-4">
  <div class=" py-4 d-flex flex-row justify-content-start align-items-center row-hl recipe__item">
    <svg class="item-hl recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="pl-3 item-hl recipe__count">${formatNumber(el.quantity)}</div>
    <div class="item-hl recipe__unit">${el.unit}</div>
    <div class="item-hl pl-3 recipe__ingredient">${limitTitle(el.text)}</div>
  </div>
</div>`;

// Render Single Recipe
export const renderRecipe = (data, isLiked) => {
  const html = `
<div class="recipe">
<figure class="recipe__fig text-center">
  <img
    class="img-fluid"
    src="${data.image}"
    alt="${data.label}"
    class="recipe__img"
  />
  <h3
    class="font-weight-bold text-center text-uppercase recipe__title"
  >
    <span>${data.label}</span>
  </h3>
</figure>

<div
  class="d-flex flex-row justify-content-around align-items-center row-hl recipe__details">
  <div class="item-hl pr-3 recipe__info">
    <svg class="align-middle recipe__info-icon">
      <use href="img/icons.svg#icon-stopwatch"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes"
      >${data.time}</span
    >
    <span class="recipe__info-text"> minutes</span>
  </div>

  <div class="item-hl recipe__info">
    <div class="d-flex flex-row align-items-center row-hl">
      <div class="item-hl pr-3">
        <svg class="align-middle recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people"
          >${data.serving}</span
        >
        <span class="recipe__info-text"> servings</span>
      </div>

      <div class="item-hl recipe__info-buttons">
        <a class="mr-3 d-inline btn__decrease">
          <svg class="align-middle recipe__info-icon">
            <use href="img/icons.svg#icon-circle-with-minus"></use>
          </svg>
        </a>
        <a class="mr-3 d-inline btn__increase">
          <svg class="align-middle recipe__info-icon">
            <use href="img/icons.svg#icon-circle-with-plus"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <button class="item-hl recipe__love">
    <svg class="header__likes">
      <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
    </svg>
  </button>
</div>
<div class="recipe__ingredients">
<div class="row m-0 recipe__ingredient-list">
${data.ingredients.map((el) => createIngredient(el)).join('')}

  </div>

  <div class="row text-center py-4">
    <div class="col">
      <button class="recipe__btn recipe_btn--add">
        <svg class="align-middle search__icon">
          <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
      </button>
    </div>
  </div>
</div>

<div class="recipe__directions p-4">
  <h2 class="text-center py-4">How to cook it</h2>
  <p class="px-4 lead recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__by">${data.source}</span>. Please check
    out directions at their website.
  </p>
  <a
    class="recipe__btn text-center mb-4"
    href="${data.url}"
    target="_blank">
    <svg class="align-middle search__icon">
      <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
    <span>Directions</span>
  </a>
</div>
</div>
 `;
  elements.recipe.insertAdjacentHTML('afterbegin', html);
};
// FUnction to update ingredients after changing serving
export const updateIngredients = (recipe) => {
  // Update serving
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.serving;
  // Update ingredients
  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((el, index) => {
    el.textContent = formatNumber(recipe.ingredients[index].quantity);
  });
};
