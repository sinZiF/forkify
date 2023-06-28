import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';
import RecipesView from './view/recipesView.js';
import {API_URL, TIMER} from './config.js';

// if (module.hot) {
//   module.hot.accept();
// };

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipe = async function() {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // 1.loading recipe
    RecipeView.renderSpiner();
    await Promise.race([model.loadRecipe(`${API_URL}${hash}`), timeout(TIMER)])
    const recipe = await JSON.parse(model.state.recipe)
    // 2.rendering recipe
    RecipeView.render(recipe);
  } catch(err) {
    RecipeView.renderError();
  }
};
const constolRecipes = async function() {
  try {
      // 1) load recipes
      RecipesView.renderSpiner();
      const query = SearchView.getQuery();
      await model.loadSearchRecipes(API_URL, query);
      RecipesView.render(model.state.search.recipes);
  } catch(error) {
    RecipesView.renderError();
  }
}

const init = function() {
    RecipeView.addHandlerRender(controlRecipe)
    SearchView.addHandlerSearch(constolRecipes)
}
init();