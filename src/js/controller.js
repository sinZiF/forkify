import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function() {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // loading recipe
    recipeView.renderSpiner();
    await model.loadRecipe(hash);
    // rendering recipe
    const recipe = await JSON.parse(model.state.recipe)
    recipeView.render(recipe);
    } catch(err) {
      console.log(err)
  }
};

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, controlRecipes))
