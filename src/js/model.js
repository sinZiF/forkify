import { RES_PER_PAGE } from './config.js';
import {getJSON, sendJSON} from './helpers.js';
import { API_URL, API_KEY } from './config.js';
import bookmarksView from './view/bookmarksView.js';

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

const generateObjectRecipe = function(data) {
    if (!data.data) return;
    let {recipe} = data.data;
    return JSON.stringify({
        id: recipe.id,
        cookingTimrecipe: +recipe.cookingTime,
        imgUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: +recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
        ...(recipe.key  && {key: recipe.key})
    });
}

export const loadRecipe = async function(id) {
    try {
        // 1.get data with API
        const data = await getJSON(`${API_URL}${id}`);

        // 2. convert json data string
        state.recipe = generateObjectRecipe(data);
        // converted recipe
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

export const uploadRecipe = async function(newRecipe) {
    // CODE REFSCTORING
    // const findIngredients = Object.entries(newRecipe).filter(ingredient => {
    //     const [key, val] = ingredient;
    //     if (key.includes('ingredient-')) {
    //         if (val !== '') {
    //             return ingredient;
    //         }
    //     }
    // });
    // const ingredients = findIngredients.map(ing => {
    //     const [_ , target] = ing;
    //     const arr = target.split(',');
    //     return {
    //         quantity: arr[0],
    //         unit: arr[1],
    //         description: arr[2]
    //     }
    // });
    // const dataPush = {
    //     cookingTime: +newRecipe.cookingTime,
    //     id: newRecipe.id,
    //     imgUrl: newRecipe.imgUrl,
    //     ingredients: ingredients,
    //     publisher: newRecipe.publisher,
    //     servings: +newRecipe.servings,
    //     sourceUrl: newRecipe.sourceUrl,
    //     title: newRecipe.title
    // };
    // console.log(dataPush)

    // wite code
    try {
        const getNewRecipe = Object.entries(newRecipe)
            .filter(recipe => {
                const [key, val] = recipe;
                if (key.startsWith('ingredient') && val !== '') return recipe;
            })
            .map(recipe => {
                const [_ , target] = recipe;
                const [quantity, unit, description] = target.replaceAll(' ', '')
                    .split(',');
                if (target.split(',').length < 3) {
                    throw new Error('error number');
                }
                return {
                    quantity: quantity ? +quantity : null,
                    unit: unit || '...',
                    description: description || '...'
                }
            });

        const dataPush = {
            cooking_time: +newRecipe.cookingTime,
            id: newRecipe.id,
            image_url: newRecipe.image,
            ingredients: getNewRecipe,
            publisher: newRecipe.publisher,
            servings: +newRecipe.servings,
            source_url: newRecipe.sourceUrl,
            title: newRecipe.title,
            // bookmarked: true
            };

        const data = await sendJSON(`${API_URL}?key=${API_KEY}`, dataPush);
        state.recipe = generateObjectRecipe(data);
        getParseRecipe();
        addBookmark(state.updateServings);
    } catch(err) {
        console.error(err)
        throw new Error(err);
    }
}