import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError(this._errorMessages);

        this._data = data;
        const markup = this._generateMarkup();
        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderSpiner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}.svg#icon-loader"></use>
                </svg>
            </div>`;
        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    _clearMarkup() {
        this._parentElement.innerHTML = '';
    }
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}.svg#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;

        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}