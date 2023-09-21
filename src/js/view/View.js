// import { tanh } from 'core-js/core/number';
import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    _clearMarkup() {
        this._parentElement.innerHTML = '';
    }

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError(this._errorMessages);
        this._data = data;
        const markup = this._generateMarkup();
        if (!render) return markup;
        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpiner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;
        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;

        this._clearMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    updateView(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((el, i) => {
            const curEl = curElements[i];
            if (!el.isEqualNode(curEl) &&
                el.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = el.textContent;
            }
            if (!el.isEqualNode(curEl)) {
                    Array.from(el.attributes).forEach(cur => {
                        curEl.setAttribute(cur.name, cur.value)
                    })
            }

        })
    }
}