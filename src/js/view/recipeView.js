import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';
class recipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #errorMessage = 'We could not find that recipe. Please try another one!';

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#clearMarkup();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderSpiner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}.svg#icon-loader"></use>
                </svg>
            </div>`;
        this.#clearMarkup();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this.#errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}.svg#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;

        this.#clearMarkup();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    addHendlerRender(hendler) {
        ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, hendler))
    }
    #generateMarkup() {
        return `
            <figure class="recipe__fig">
            <img src="${this.#data.imgUrl}" alt="${this.#data.title}" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${this.#data.title}</span>
            </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                <use href="${icons}.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
                <span class="recipe__info-text">${this.#data.cookingTime < 60 ? 'minutes' : 'hours' }</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
            <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
            <svg>
            <use href="${icons}.svg#icon-minus-circle"></use>
            </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
            <svg>
            <use href="${icons}.svg#icon-plus-circle"></use>
            </svg>
            </button>
                </div>
                </div>

                <div class="recipe__user-generated">
                <svg>
                <use href="${icons}.svg#icon-user"></use>
                </svg>
                </div>
                <button class="btn--round">
                <svg class="">
                <use href="${icons}.svg#icon-bookmark-fill"></use>
                </svg>
                </button>
                </div>

                <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this.#data.ingredients.map(cur =>
                        this.#getIngredient(cur)).join('')}
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
                <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
                </a>
            </div>`;
    }
    #clearMarkup() {
        this.#parentElement.innerHTML = '';
    }
    #getIngredient(cur) {
        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${cur.quantity ? new Fraction(cur.quantity) : ''}</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${cur.unit}</span>
                    ${cur.description}
                </div>
            </li>`;
    }
}

export default new recipeView()