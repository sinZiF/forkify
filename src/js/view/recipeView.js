import View from './View.js';
import icons from 'url:../../img/icons.svg';
const fracty = require('fracty');
class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _data;

    addHandlerRender(hendler) {
        ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, hendler))
    }
    addHandlerServings(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;
            const {updateTo} = btn.dataset;
            if (+updateTo > 0) handler(+updateTo);
        })
    }
    addHandlerBookmark(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--bookmark');
            if (!btn) return;
            handler();
        })
    }
    _generateMarkup(data = this._data) {
        return `
            <figure class="recipe__fig">
            <img src="${data.imgUrl}" alt="${data.title}" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${data.title}</span>
            </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${data.cookingTime}</span>
                <span class="recipe__info-text">${data.cookingTime < 60 ? 'minutes' : 'hours' }</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
            <button data-update-to="${data.servings - 1}" class="btn--tiny btn--update-servings">
            <svg>
            <use href="${icons}#icon-minus-circle"></use>
            </svg>
            </button>
            <button data-update-to="${data.servings + 1}" class="btn--tiny btn--update-servings">
            <svg>
            <use href="${icons}#icon-plus-circle"></use>
            </svg>
            </button>
                </div>
                </div>

                <div class="recipe__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
                <button class="btn--round btn--bookmark">
                <svg class="">
                <use href="${icons}#icon-bookmark${data?.bookmarked ? '-fill' : ''}"></use>
                </svg>
                </button>
                </div>

                <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${data.ingredients.map(this._getIngredient).join('')}
                </ul>
                </div>

                <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
                target="_blank"
                >
                <span>Directions</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </a>
            </div>`;
    }
    _getIngredient(cur) {
        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${cur.quantity ? fracty(cur.quantity) : ''}</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${cur.unit}</span>
                    ${cur.description}
                </div>
            </li>`;
    }
}

export default new RecipeView()