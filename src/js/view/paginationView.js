import { RES_PER_PAGE } from '../config.js';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerPagination(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btnElement = e.target.closest('.btn--inline');
            const goTo = +btnElement.dataset.goto;
            handler(goTo);
        })
    }

    _generateMarkup() {
        const curEl = this._data.page;
        const pages = Math.ceil(this._data.recipes.length / RES_PER_PAGE);

        if (curEl === 1 && curEl !== pages) {
            return this._btnNext(curEl);
        }

        if (curEl > 1 && curEl !== pages) {
            return `
            ${this._btnPrev(curEl)}
            ${this._btnNext(curEl)}`;
        }

        if (curEl === pages && pages > 1) {
            return this._btnPrev(curEl);
        }

        return '';
    }

    _btnNext(page) {
        return `
            <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`
    }

    _btnPrev(page) {
        return `
            <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>`
    }
}

export default new PaginationView();