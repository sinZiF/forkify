import {async} from 'regenerator-runtime';

export const state = {
    recipe: {}
};

export const loadRecipe = async function(hash) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${hash}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} ${res.status}`)
        let {recipe} = data.data;
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
        alert(error)
    }
};