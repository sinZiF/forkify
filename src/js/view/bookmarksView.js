import View from "./View.js";
import PreviewView from "./previewView.js";

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessages = `No bookmarks yet`;

    addHandlerBookmarks(handler) {
        window.addEventListener('load', handler)
    }
    _generateMarkup() {
        return this._data
            .map(bookmark => PreviewView.render(bookmark, false))
            .join('');
    }
}

export default new BookmarksView();