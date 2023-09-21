import { RES_PER_PAGE } from './config.js';
import {getJSON} from './helpers.js';
import { API_URL } from './config.js';

export const state = {
    recipe: {},
    updateServings: {},
    search: {
        query: '',
        recipes: [],
        page: 1,
        resultPerPage: RES_PER_PAGE
    },
    bookmarks: [],
};

export const loadRecipe = async function(id) {
    try {
        // 1.get data with API
        const data = await getJSON(`${API_URL}${id}`);
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

        getParseRecipe();
        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            // const idRecipe = state.bookmarks.findIndex(bookmark => bookmark.id = id);
            // state.updateServings.bookmarked = state.bookmarks[idRecipe].bookmarked;
            state.updateServings.bookmarked = true;
        } else {
            state.updateServings.bookmarked = false;
        }
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
        state.search.page = 1;
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

const persistBookmark = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmarkForLocalStorage = function() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (!bookmarks) return;
    state.bookmarks = bookmarks;
}

export const addBookmark = function(recipe) {
    if(recipe.id === state.updateServings.id && !state.updateServings?.bookmarked) {
        state.updateServings.bookmarked = true;

        if (!state.bookmarks.some(recipe => recipe.id === state.updateServings.id)) {
            state.bookmarks.push(state.updateServings);
        }
    } else {
        removeBookmark(recipe)
    }
    persistBookmark();
}

export const removeBookmark = function(recipe) {
        state.updateServings.bookmarked = false;
        const idRecipe = state.bookmarks.findIndex(bookmark => bookmark.id = recipe.id);
        state.bookmarks.splice(idRecipe, 1);
    persistBookmark();
}


export const getParseRecipe = function() {
    state.updateServings = JSON.parse(state.recipe);
}

const init = function() {
    addBookmarkForLocalStorage();
}

init();