import View from './view.js';
// import * as model from '../model.js';

class Result extends View{

    constructor(){
        super(document.querySelector('.results'),'Recipe not found. Please try another one.');
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

    // render(result){
    //     // console.log('rendering',result);

    //     // console.log('markup', markup);
    //     this._parent.innerHTML = this.#generateMarkup(result);
    // }

}

export default new Result();