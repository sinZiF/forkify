import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import getRecipesView from './view/getRecipesView.js';
import {API_URL, TIMER} from './config.js';

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
    recipeView.renderSpiner();
    await Promise.race([model.loadRecipe(`${API_URL}${hash}`), timeout(TIMER)])
    const recipe = await JSON.parse(model.state.recipe)
    // 2.rendering recipe
    recipeView.render(recipe);
  } catch(err) {
    recipeView.renderError();
  }
};
const constolRecipes = async function() {
  try {
      // 1) load recipes
      const query = getRecipesView.getQuery();
      await model.loadSearchRecipes(API_URL, query);
      // 2) converts and rendering data
      model.state.search.recipes.forEach(recipe => {
      getRecipesView.render(JSON.parse(recipe));
    })
  } catch(error) {
    throw new Error(error)
  }
}

const init = function() {
    recipeView.addHandlerRender(controlRecipe)
    getRecipesView.addHandlerSearch(constolRecipes)
}
init();