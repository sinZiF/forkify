import View from "./View.js";
import previewView from "./previewView.js";


class RecipesView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessages = `No recipes found for your query! Please try again`;

    _generateMarkup() {
        return this._data.map(JSON.parse)
            .map(recipe => previewView.render(recipe, false))
            .join('');
    }
}

export default new RecipesView();