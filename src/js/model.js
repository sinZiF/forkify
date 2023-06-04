import {getJSON} from './helpers.js';

export const state = {
    recipe: {}
};

export const loadRecipe = async function(url) {
    try {
        // 1.get data with API
        const data = await getJSON(url);
        let {recipe} = data.data;
        // 2. convert json data string
        state.recipe = JSON.stringify({
          cookingTime: recipe.cooking_time,
          id: recipe.id,
          imgUrl: recipe.image_url,
          ingredients: recipe.ingredients,
          publisher: recipe.publisher,
          servings: recipe.servings,
          sourceUrl: recipe.source_url,
          title: recipe.title
        });
    } catch(error) {
        new Error(error);
    }
};