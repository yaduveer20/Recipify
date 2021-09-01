import View from './view.js';
import * as model from '../model.js';
import icons from 'url:../../img/icons.svg';

class Bookmark extends View{
    #recipeDetailsContainer;
    #btn_bookmark;
    #bookmarkParent

    constructor(){
        super(document.querySelector('.recipe'), `No bookmarks yet. Bookmark your favourite recipes.`);
    }

    _generateMarkup(result){
        return result.map(recipe=>{
            return `<li class="preview">
                <a class="preview__link" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                </a>
            </li>`
        }).join('');
    }

    fillBookmarkOnAdd(){
        this.#btn_bookmark = document.querySelector('.btn--bookmark');
        this.#btn_bookmark.innerHTML = this.#getButtonFillUnfill();
    }

    UnfillBookmarkOnRemove(){
        this.#btn_bookmark.innerHTML = this.#getButtonFillUnfill();
    }

    #getButtonFillUnfill(){
        return `<svg class="">
            <use href="${icons}#icon-bookmark${model.state.recipe.bookmarked ? '-fill' : ''}"></use>
        </svg>`;
    }

    renderBookmark(bookmarks){
        this.#bookmarkParent = document.querySelector('.bookmarks__list');
        this.#bookmarkParent.innerHTML = this._generateMarkup(bookmarks);
    }

    addBookmarkHandler(handler){
        const thisClass = this;
        this._parent.addEventListener('click', function(event){
            this._btn = event.target.closest('.btn--bookmark');
            if(!this._btn) return;

            thisClass.#btn_bookmark = document.querySelector('.btn--bookmark');
            handler();
        });
    }
}

export default new Bookmark();