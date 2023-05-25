const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
const showRecipe = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    const data = await res.json();
    const {recipe} = data.data;
    if (!res.ok) throw new Error(`${data.message} ${res.status}`)
    return {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imgUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title
    }
  } catch(err) {
    console.log(err)
  }
};

showRecipe()
  .then(data => {
    console.log(data)
  });

(async () => {
  const test = await showRecipe();
  console.log(test)
})()