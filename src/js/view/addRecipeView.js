import View from "./View.js";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded';

    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');

    constructor() {
        super();
        this._addHandlerBtnOpen();
        this._addHandlerBtnClose();
    }

    generateForm() {
        const markup = `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST23" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST23" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST23" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST23" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>
        <button class="btn upload__btn">
          <svg>
            <use href="img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>`;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _addHandlerBtnOpen() {
        this._btnOpen.addEventListener('click', this.toggleHidden.bind(this));
    }

    _addHandlerBtnClose() {
        this._btnClose.addEventListener('click', this.toggleHidden.bind(this));
        this._overlay.addEventListener('click', this.toggleHidden.bind(this));
    }

    toggleHidden() {
        if (!this._overlay.classList.contains('hidden') && this._window.classList.contains('hidden')) return;
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    addHandlerAddRecipe(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArr = [... new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    // bad practice
    // addHandlerNewRecipe(handler) {
    //     this._btnOpen.addEventListener('click', e => {
    //         if (!this._window) return;

    //         if (this._window.classList.contains(this._hiden))
    //              this._window.classList.remove(this._hiden);
    //         if (this._overlay)
    //              this._overlay.classList.remove(this._hiden);
    //         this._closeAddNewRecipe();
    //         handler();
    //     })
    // }

    // bad practice
    // _closeAddNewRecipe() {
    //     window.addEventListener('click', e => {
    //         if (!e.target.classList.contains(this._overlay.classList[0]) &&
    //             !e.target.classList.contains(this._btnClose.classList[0])) return;
    //         this._overlay.classList.add(this._hiden);
    //         this._window.classList.add(this._hiden);
    //     })
    // }


}

export default new AddRecipeView();