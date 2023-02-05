/** @format */
import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

// -global state of the app
const state = {};

// -Search object
const controlSearch = async () => {
  // 1)Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2)New search object add to state
    state.search = new Search(query);

    // 3)Prepare UI for results
    searchView.clearField();
    searchView.clearSearchList();
    renderLoader(elements.searchRes);

    // 4)Search for recipes
    await state.search.getResults();

    // 5)Render Resulsts on UI
    clearLoader();

    searchView.renderResults(state.search.results);
  }
};
// *********************
// Recipe object
// *********************
const controlRecipe = async () => {
  // 1)Get ID from URL
  const id = window.location.hash.replace('#', '');
  if (id) {
    // 2)Create New Recipe object and add to state
    state.recipe = new Recipe(id);

    try {
      // 3)Prepare UI for Recipe
      recipeView.clearRecipe();
      renderLoader(elements.recipe);
      if (state.search) searchView.highlightSelected(id);

      // 4)Get Data from Recipe object
      await state.recipe.getRecipe();

      // 5)calculate serving and time and ingredients
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServing();

      // 6)Render the Recipe on UI
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
      alert('Error processing recipe!');
    }
  }
};
// *********************
// -Shopping List object
// *********************
const controlShoppingList = () => {
  if (!state.shoppingList) state.shoppingList = new ShoppingList();

  state.recipe.ingredients.forEach((el) => {
    const item = state.shoppingList.addItem(el.quantity, el.unit, el.text);
    shoppingListView.renderItem(item);
  });
};
// *********************
// -Liked recepies
// *********************
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;
  // User has not yet liked the recipe
  if (!state.likes.isLiked(currentId)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.label,
      state.recipe.source,
      state.recipe.image
    );
    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to the UI like list
    likesView.renderLike(newLike);
    // User has liked the recipe
  } else {
    // Remove like to the state
    state.likes.deleteLike(currentId);
    // Toggle the like button
    likesView.toggleLikeBtn(false);
    // Remove like to the UI like list
    likesView.deleteLike(currentId);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// *********************
// -Scroll button
// *********************
const scrollWindow = function () {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 50);
      scrollWindow();
    }, 10);
  }
};
let scrollBtn = document.getElementById('scroll-btn');
const scrollBtnDisplay = function () {
  const scrollBtn = document.getElementById('scroll-btn');
  window.scrollY > 10
    ? scrollBtn.classList.add('show')
    : scrollBtn.classList.remove('show');
};

// *********************
// EVENT LISTENERS
// *********************
// Event Listener to Get Year For Footer
elements.getYear.textContent = new Date().getFullYear();

// Event Listener{**TYPE : CLICK**}  to Run search Button
elements.searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  controlSearch();
});

// Event Listener {**TYPE : hashchange**} to Show single Recipe
// Event Listener {**TYPE : Load**} to the load Event
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// Event Listener {**TYPE : click**} to the page buttons
elements.resultPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn__result');
  if (btn) {
    const goTopage = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchList();
    searchView.renderResults(state.search.results, goTopage);
  }
});

// Event Listener {**TYPE : click**} to Handling recipe button clicks
elements.recipe.addEventListener('click', (e) => {
  // Decrease Recipe EventListener
  if (e.target.matches('.btn__decrease, .btn__decrease *')) {
    if (state.recipe.serving > 1) {
      // Decrease button is Clicked
      state.recipe.updateIngredients('dec');
      recipeView.updateIngredients(state.recipe);
    }
    // Increase Recipe EventListener
  } else if (e.target.matches('.btn__increase, .btn__increase *')) {
    // Increase button is Clicked
    state.recipe.updateIngredients('inc');
    recipeView.updateIngredients(state.recipe);
    // Add recipe to the Shopping List
  } else if (e.target.matches('.recipe_btn--add, .recipe_btn--add *')) {
    controlShoppingList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

// Event Listener {**TYPE : click**} to update or delete shopping list
elements.shoppingList.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete Btn
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete the item form state
    state.shoppingList.deleteItem(id);
    // delete  the item from UI
    shoppingListView.deleteItem(id);
    // Handle the Update items
  } else if (e.target.matches('.shopping__input, .shopping__input *')) {
    const val = parseFloat(e.target.value, 10);
    if (val > 0) {
      state.shoppingList.updateQuantity(id, val);
    }
  }
});

// Event Listener {**TYPE : Load**} to restore liked recipes on the page
window.addEventListener('load', () => {
  // Define likes in State
  state.likes = new Likes();
  // Restore Likes
  state.likes.readStorage();
  // Toggle Like Menu
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  // Render the existing likes
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// Event Listener {**TYPE : Scroll & Click**} for scroll button
window.addEventListener('scroll', scrollBtnDisplay);
scrollBtn.addEventListener('click', scrollWindow);
