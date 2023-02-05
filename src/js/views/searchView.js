/** @format */
import { elements } from './base';

// Get Input Value
export const getInput = () => elements.searchInput.value;

// Clear Input Function
export const clearField = () => (elements.searchInput.value = '');
// Clear Search List Field Function
export const clearSearchList = () => {
  elements.searchResults.innerHTML = '';
  elements.resultPages.innerHTML = '';
};

export const highlightSelected = (id) => {
  const reultsArr = Array.from(document.querySelectorAll('.results__link'));
  reultsArr.forEach((el) => el.classList.remove('results__link--active'));
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add('results__link--active');
};

// Create a Function for Limite  Title
export const limitTitle = (title, limit = 13) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((num, currentTitle) => {
      if (num + currentTitle.length <= limit) {
        newTitle.push(currentTitle);
      }
      return num + currentTitle.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// Rneder Recipes function
const renderRecipes = (recipe) => {
  let id = recipe.recipe.shareAs;
  id = id.split('/')[4].split('-')[id.split('/')[4].split('-').length - 1];

  const html = `
<a class="list-group-item results__link" href="#${id}">
 <div class="d-flex result__container flex-row justify-content-start align-items-center row-hl">
  <div class="item-h1 px-4">
   <figure class="results__fig mb-0">
    <img class="rounded-circle" src="${recipe.recipe.image}" alt="${
    recipe.recipe.label
  }"/>
   </figure>
  </div>
  <div class="item-h1">
   <div class="d-flex flex-column row-hl results__data">
    <div class="item-hl">
     <div class="text-uppercase results__name">${limitTitle(
       recipe.recipe.label
     )}</div>
    </div>
    <div class="item-hl">
      <div class="results__author">${limitTitle(recipe.recipe.source)}</div>
    </div>
   </div>
  </div>
 </div>
</a>`;
  elements.searchResults.insertAdjacentHTML('beforeend', html);
};

const createButton = (page, type) => {
  if (type === 'prev') {
    return `
<button class="d-inline btn__result float-left btn results__btn--prev" data-goto=" ${
      page - 1
    }">
  <svg class="search__icon align-middle">
    <use href="img/icons.svg#icon-triangle-left"></use>
  </svg>
  <span>Page ${page - 1}</span>
</button>

`;
  } else if (type === 'next') {
    return `
  <button class="d-inline btn__result float-right btn results__btn--next" data-goto="${
    page + 1
  }">
    <span>Page ${page + 1}</span>
    <svg class="search__icon align-middle">
      <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
  </button>

`;
  }
};

// Render Buttons
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  // Button to go to next page btn
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
    // Button to go to Both buttons
  } else if (page < pages) {
    button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
    // Button to go to prev page btn
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }
  elements.resultPages.insertAdjacentHTML('afterbegin', button);
};

// Rneder Recipes Array function
export const renderResults = (recipes, page = 1, resultPerPage = 3) => {
  // Render results of current page
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;
  recipes.slice(start, end).forEach(renderRecipes);
  // Render pagination
  renderButtons(page, recipes.length, resultPerPage);
};
