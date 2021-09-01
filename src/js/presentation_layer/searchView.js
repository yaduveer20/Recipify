import View from './view';
// import * as model from '../model.js';

class Search extends View{
    _searchParent;
    _searchInput;
    // _recipeParent;
    _handler;
    
    constructor(){
        super(document.querySelector('.results'), 'Recipe not found. Please try another recipe.');
        this._searchParent = document.querySelector('.search');
        this._searchInput = document.querySelector('.search__field');
        // this._recipeParent = document.querySelector('.recipe');
    }

    #clearInputField(){
        this._searchInput.value = '';
    }

    #clear(){
        this._parent.innerHTML = '';
    }

    #getInputFieldValue(){
        // console.log(this._searchInput.value);
        return this._searchInput.value;
    }

    #handlerCallBack(event){
        event.preventDefault();
        this.#clear();

        const input = this.#getInputFieldValue();

        if(!input) return;

        this.#clearInputField();
        
        //handler function - fetch search recipe
        this._handler(input); 
    }


    addSearchHandler(handler){
        this._handler = handler;
        this._searchParent.addEventListener('submit', this.#handlerCallBack.bind(this));
    }

}

export default new Search();