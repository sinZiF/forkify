import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class RecipesView extends View{
    _data;
    _parentElement = document.querySelector('.results');
    _errorMessages = `No recipes found for your query! Please try again`;

    _generateMarkup() {
        return this._data.map(JSON.parse)
            .map(this._markup)
            .join('');
    }
    _markup(data) {
        return `
        <li class="preview">
                <a class="preview__link preview__link--active" href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.imgUrl}" alt="${data.publisher}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                    <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}.svg#icon-user"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>`
    }
}

export default new RecipesView();