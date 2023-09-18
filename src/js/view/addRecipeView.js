import View from "./View.js";

class AddRecipeView extends View {
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _overlay = document.querySelector('.overlay');
    _parentElement = document.querySelector('.nav__item');
    _window = document.querySelector('.add-recipe-window');

    constructor() {
        super();
        this._addHandlerBtnOpen();
        this._addHandlerBtnClose();
    }


    _addHandlerBtnOpen() {
        this._btnOpen.addEventListener('click', this._toggleHidden.bind(this));
    }

    _addHandlerBtnClose() {
        this._btnClose.addEventListener('click', this._toggleHidden.bind(this));
        this._overlay.addEventListener('click', this._toggleHidden.bind(this));
    }

    _toggleHidden() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    // bad practice
    addHandlerNewRecipe(handler) {
        this._btnOpen.addEventListener('click', e => {
            if (!this._window) return;

            if (this._window.classList.contains(this._hiden))
                 this._window.classList.remove(this._hiden);
            if (this._overlay)
                 this._overlay.classList.remove(this._hiden);
            this._closeAddNewRecipe();
            handler();
        })
    }

    // bad practice
    _closeAddNewRecipe() {
        window.addEventListener('click', e => {
            if (!e.target.classList.contains(this._overlay.classList[0]) &&
                !e.target.classList.contains(this._btnClose.classList[0])) return;
            this._overlay.classList.add(this._hiden);
            this._window.classList.add(this._hiden);
        })
    }


}

export default new AddRecipeView();