import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';
import View from './view.js';

export class RecipeView extends View{
    // #parent;
    #recipe;
    #servingsButtons;
    #ingredientsListContainer;
    #newQt;
    #servingsContainer;
    // #btnInc;
    // #btnDec;
    // #errorMessage;
    
    constructor(){
        // console.log('constructor recipe');
        super(document.querySelector('.recipe'), `Recipe doesn't exist. Please try another one!`);
        // this._errorMessage = `Recipe doesn't exist. Please try another one!`;
        // this._parent = document.querySelector('.recipe');
    }

    _generateMarkup(recipes){

        this.#recipe = recipes;
        return ` <figure class="recipe__fig">
            <img src="${this.#recipe.image}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${this.#recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#recipe.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#recipe.servings}</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings btn-dec" data-go-to="${this.#recipe.servings-1}">
                <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                </svg>
                </button>
                <button class="btn--tiny btn--increase-servings btn-inc" data-go-to="${this.#recipe.servings+1}">
                <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                </svg>
                </button>
            </div>
            </div>
            <div class="recipe__user-generated">
            
            </div>
            <button class="btn--round btn--bookmark">
            <svg class="">
                <use href="${icons}#icon-bookmark"></use>
            </svg>
            </button>
        </div>


        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this.#makeListOfIngredients()}
            </ul>
        </div>


        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#recipe.publisher}</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="${this.#recipe.sourceUrl}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>
            `;
    }

    

    #makeListOfIngredients(){
        let ingredients = '';
        this.#recipe.ingredients.forEach(ingredient=>{
            ingredients += `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
                </div>
            </li>`;
        });
        return ingredients;
    }


    #servingsCallback(event){
        // console.log('hello');
        this._btn = event.target.closest('.btn--tiny');
        // console.log(this._btn);
        if(!this._btn) return;

        this.#updateServings();
    }

    #getUpdatedIngredients(){
        let ingredients = '';
        const servings = this.#recipe.servings;
        
        // console.log('inside', servings, this.#newQt);
        this.#recipe.ingredients.forEach(ingredient=>{
            const quantity = (ingredient.quantity * this.#newQt) / servings;
            ingredient.quantity = quantity;
            ingredients += `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${quantity ? new Fraction(quantity).toString() : ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
                </div>
            </li>`;
        });
        return ingredients;
    }

    #getUpdatedButtonsMarkup(){
        return `<button class="btn--tiny btn--increase-servings btn-dec" data-go-to="${this.#recipe.servings-1}">
        <svg>
            <use href="${icons}#icon-minus-circle"></use>
        </svg>
        </button>
        <button class="btn--tiny btn--increase-servings btn-inc" data-go-to="${this.#recipe.servings+1}">
        <svg>
            <use href="${icons}#icon-plus-circle"></use>
        </svg>
        </button>`
    }

    #updateServings(){

        this.#newQt = +this._btn.dataset.goTo;
        if(this.#newQt === 0) return;

        const ingredientsMarkup = this.#getUpdatedIngredients();

        //update servings quantity;
        this.#recipe.servings = this.#newQt;

        //update ingredients list
        this.#ingredientsListContainer.innerHTML = ingredientsMarkup;

        //render updated servings quantity
        this.#servingsContainer.textContent = this.#newQt;
        this.#servingsButtons.innerHTML = this.#getUpdatedButtonsMarkup();
    }


    //servings buttons click handler
    addServingsHandler(){
        // this.#btnInc = document.querySelector('.btn-inc');
        // this.#btnDec = document.querySelector('.btn-dec');
        this.#ingredientsListContainer = document.querySelector('.recipe__ingredient-list');
        this.#servingsContainer = document.querySelector('.recipe__info-data--people');
        this.#servingsButtons = document.querySelector('.recipe__info-buttons');
        
        //event listener
        this.#servingsButtons.addEventListener('click', this.#servingsCallback.bind(this));
    }
}