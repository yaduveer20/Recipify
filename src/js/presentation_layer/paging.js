import View from './view.js';
import * as model from '../model.js';
import icons from 'url:../../img/icons.svg';

class Paging extends View{
    #totalPages;
    #page;

    constructor(){
        super(document.querySelector('.pagination'),'No message');
    }

    #getPagePreviousButton(){
        return `<button data-page=${this.#page-1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.#page-1}</span>
      </button>`
    }

    #getPageNextButton(){
        return `<button data-page="${this.#page+1}" class="btn--inline pagination__btn--next">
            <span>Page ${this.#page+1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`
    }

    _generateMarkup(result){
        // console.log(model.state.search.page);

        this.#page = model.state.search.page;
        this.#totalPages = model.state.search.totalPages;
        // console.log(this.#totalPages);
        // console.log(this._parent);

        //if page = 1 and there are more than one pages
        if(this.#page === 1 && this.#totalPages > 1){
            // console.log(this._parent);
            // console.log(1)
            return this.#getPageNextButton();
        }

        //if last page
        if(this.#page === this.#totalPages && this.#page >1){
            // console.log(2)
            return this.#getPagePreviousButton();
        }

        //if the middle pages
        if(this.#page < this.#totalPages){
            // console.log()
            return `${this.#getPagePreviousButton()} ${this.#getPageNextButton()}`
        }

        return '';
    }

    //click event handler for page buttons
    addClickHandler(handler){
        this._parent.addEventListener('click', function(event){
            const btn = event.target.closest('.btn--inline');
            // console.log('btn', btn);
            
            if(!btn) return;

            handler(+btn.dataset.page);
        })
    }
}

export default new Paging();