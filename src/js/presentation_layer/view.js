import icons from 'url:../../img/icons.svg';

export default class View{
    _parent;
    _errorMessage;
    _markup;
    _btn;

    constructor(parent,errorMessage){
        this._parent = parent;
        this._errorMessage = errorMessage;
    }

    //render spinner
    renderSpinner = async function(){
        const html = `<div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;

        this._parent.innerHTML = html;
    }

    //render error
    renderError(message = this._errorMessage){
        const errorContent = `<div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;

        this._parent.innerHTML = errorContent;
    }

    //render search recipe items
    render(result){
        // console.log('rendering',result);

        // console.log('markup', markup);
        this._markup = this._generateMarkup(result);
        this._parent.innerHTML = this._markup;
    }

    //update recipes - render a partial portion of DOM
    // _update(result){
    //     console.log('update result');
    //     // console.log('markup', this._markup);

    //     console.log(result);
    //     console.log(this._btn);
        
    // }


    //fetch load and hashchange event handler 
    addEventHandler(handler){
        ['load','hashchange'].forEach(event=> addEventListener(event,handler));
    }
}