import icons from 'url:../../img/icons.svg';
class getRecipeView {
    #parentElement = document.querySelector('.search');
    #results = document.querySelector('.results');
    #data;

    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();
        this.#results.insertAdjacentHTML('afterbegin', markup);
    }
    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }
    addHandlerSearch(handler) {
        this.#parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            handler()
        })
    }
    #clearInput() {
        this.#parentElement.querySelector('.search__field').value = '';
    }
    #generateMarkup() {
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${this.#data.id}">
                <figure class="preview__fig">
                    <img src="${this.#data.imgUrl}" alt="${this.#data.publisher}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this.#data.title}</h4>
                    <p class="preview__publisher">${this.#data.publisher}</p>
                    <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}.svg#icon-user"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>`;
    }

}

export default new getRecipeView();