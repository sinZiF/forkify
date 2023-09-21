import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {API_URL, TIMER} from './config.js';
import * as model from './model.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import recipeView from './view/recipeView.js';
import recipesView from './view/recipesView.js';
import searchView from './view/searchView.js';
import addRecipeView from './view/addRecipeView.js';
import View from './view/View.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipe = async function(e) {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // 1.loading recipe
    recipeView.renderSpiner();
    await Promise.race([model.loadRecipe(hash), timeout(TIMER)]);
    const recipe = model.state.updateServings;
    // 2.rendering recipe
    recipeView.render(recipe);
    // add bookmarks and render
    bookmarksView.render(model.state.bookmarks);
    recipesView.render(model.getSearchResultPage());
  } catch(err) {
    recipeView.renderError();
  }
};

const controlRecipes = async function() {
  try {
      // 1) load recipes
      recipesView.renderSpiner();
      const query = searchView.getQuery();
      await model.loadSearchRecipes(API_URL, query);
      recipesView.render(model.getSearchResultPage());
      paginationView.render(model.state.search);
    } catch(error) {
      recipesView.renderError();
    }
  };

const controlPagination = function(goTo) {
  recipesView.render(model.getSearchResultPage(goTo));
  paginationView.render(model.state.search)
};

const controlServings = function(newServings) {
  if (!Object.keys(model.state.updateServings).length || JSON.parse(model.state.recipe).id !== model.state.updateServings.id) {
    const parseRecipe = model.getParseRecipe(newServings);
    model.state.updateServings = parseRecipe;
  }
  if (newServings > 0) {
    model.state.updateServings.ingredients.forEach(ingridient => {
      ingridient.quantity = ingridient.quantity * newServings / model.state.updateServings.servings;
    });
    model.state.updateServings.servings = newServings;
    recipeView.render(model.state.updateServings);
  }
};

const controlBookmark = function() {
  if (JSON.parse(model.state.recipe).bookmarked) return;
    model.addBookmark(model.state.updateServings);
    // add update method
    recipeView.render(model.state.updateServings);
    // add bookmarks and render
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
    bookmarksView.addHandlerBookmarks(controlBookmarks)
    recipeView.addHandlerBookmark(controlBookmark);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerServings(controlServings);
    searchView.addHandlerSearch(controlRecipes);
    paginationView.addHandlerPagination(controlPagination);
};
init();