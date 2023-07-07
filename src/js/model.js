import { RES_PER_PAGE } from './config.js';
import {getJSON} from './helpers.js';

export const state = {
    recipe: {},
    updateServings: {},
    search: {
        query: '',
        recipes: [],
        page: 1,
        resultPerPage: RES_PER_PAGE
    }
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
        throw new Error(error);
    }
};

export const loadSearchRecipes = async function(url, input) {
    try {
        // get data with API
        state.search.query = input;
        const data = await getJSON(`${url}?search=${input}`);
        if (!data) return;
        // convert json data string
        const {recipes} = data.data;
        state.search.recipes = recipes.map(recipe => {
            return JSON.stringify(
                {
                    publisher: recipe.publisher,
                    id: recipe.id,
                    imgUrl: recipe.image_url,
                    title: recipe.title
                }
            )
        });
    } catch(error) {
        throw new Error(error)
    }
}

export const getSearchResultPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (state.search.page - 1) * state.search.resultPerPage;
    const end = state.search.page * state.search.resultPerPage;

    return state.search.recipes.slice(start, end);
}

export const getParseRecipe = function() {
    return state.updateServings = JSON.parse(state.recipe);
}