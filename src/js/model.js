 import {async} from 'regenerator-runtime';
 import {API_URL} from './variables.js';
 import {ITEMS_PER_PAGE} from './variables.js';
 import bookmark from './presentation_layer/bookmarkView.js';
 
 export const state = {
     recipe: {},
     search: {
         results: [],
         page: 1,
         resultsPerPage: ITEMS_PER_PAGE,
         totalPages: 1
     },

     bookmarks: []
 };

 export const fetchRecipe = async function(id){
    try{
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);

        const {recipe} = data.data;
        state.recipe = {
            cookingTime: recipe.cooking_time,
            image: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        };

        return {status: true};

    } catch(err){
        return {status: false, err};
    }
 };


 //search functionality
 export const searchFetchRecipe = async function(recipe){
     try{
        //  console.log('inside searchFetch');
        const res = await fetch(`${API_URL}?search=${recipe}`)
        const data = await res.json();
        const {recipes} = data.data;
        state.search.results = recipes.map(recipe=>{
            return {
                id: recipe.id,
                image: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title
            }
        });
        
        state.search.page = 1;
        state.search.totalPages = Math.ceil(state.search.results.length / ITEMS_PER_PAGE);

     }
     catch(err){

     }


 }

//  searchFetchRecipe('pizza');
//load bookmarks from local storage on initialization
const init = function(){
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(!bookmarks) return;

    //render and load existing bookmarked recipes
    state.bookmarks = bookmarks;
    bookmark.renderBookmark(state.bookmarks);
}

init();

 