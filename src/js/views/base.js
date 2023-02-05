/** @format */

export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchBtn: document.querySelector('.search__btn'),
  searchResults: document.querySelector('.results__list'),
  searchRes: document.querySelector('.search__result'),
  resultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  recipeView: document.querySelector('.recipe__view'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes'),
  likesResults: document.querySelector('.likes__panel'),
  getYear: document.querySelector('#year'),
};

export const elementStrings = {
  loader: 'loader',
};

// Create Loader Function
export const renderLoader = (parentElement) => {
  const html = `
  <div class="${elementStrings.loader}">
  <div class="text-center">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
</div>`;
  parentElement.insertAdjacentHTML('afterbegin', html);
};
// Clear Loader Function
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
