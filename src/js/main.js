'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import {RecipeView} from "./presentation_layer/recipeView.js";
import search from './presentation_layer/searchView.js';
import result from './presentation_layer/searchResult.js';
import paging from './presentation_layer/paging.js';
import bookmark from './presentation_layer/bookmarkView.js';

const conRecipe = document.querySelector('.recipe');
const recipeView = new RecipeView();


//fetching and rendering recipe from forkify api;
let id = '5ed6604591c37cdc054bc886';
let flag = false;

const fetchDisplayRecipe = async function(){

  id = window.location.hash ? window.location.hash.slice(1) : id;
  if(!id) return;

  //render spinner
  conRecipe.innerHTML = '';
  recipeView.renderSpinner();

  //fetch recipe and update recipe in state
  const res = await model.fetchRecipe(id);
  if(!res.status) recipeView.renderError();
  else{
    //render recipe
    recipeView.render(model.state.recipe);

    //activate servings event handler
    recipeView.addServingsHandler();

    //fill bookmark on reload
     updateBookmark();
  }

}


//search functionality controller
const fetchDisplaySearchResults = async function(recipe){
  try{
    result.renderSpinner();

    //fetch recipes
    await model.searchFetchRecipe(recipe);

    if(!model.state.search.results.length) throw new Error(`Recipe doesn't exists.`);
    // console.log('recipe', model.state.searchRecipes);
    
    //render recipes
    // console.log('ten', getRecipeResultsPerPage());
    // result.render(model.state.search.results);
    result.render(getRecipeResultsPerPage());

    // console.log('paging');
    paging.render('');
  }
  catch(err){
    search.renderError();
  }
}

//get x numbers of recipe for the specified page
const getRecipeResultsPerPage = function(page = model.state.search.page){
  model.state.search.page = page;
  const start = (page-1)*10;
  const end = page*10;
  return model.state.search.results.slice(start,end);
}


//naviagate Pages
const updatePages = function(page){
  // console.log('inside',page);
  result.render(getRecipeResultsPerPage(page));
  paging.render('');
};


//bookmarks controller
const controlBookmark = function(){
  if(!model.state.recipe.bookmarked) addBookmark();
  else removeBookmark();
}

//add bookmark to bookmarks array in model
const addBookmark = function(){
  model.state.recipe.id = window.location.hash.slice(1);
  model.state.bookmarks.push(model.state.recipe);
  model.state.recipe.bookmarked = true;
  bookmark.fillBookmarkOnAdd();

  // render bookmark
  bookmark.renderBookmark(model.state.bookmarks);

  //store updated bookmark to local storage
  localStorage.setItem('bookmarks', JSON.stringify(model.state.bookmarks)); 
}

const removeBookmark = function(){
  model.state.recipe.bookmarked = false;
  bookmark.UnfillBookmarkOnRemove();
  const index = model.state.bookmarks.findIndex(boomark => bookmark.id === location.hash.slice(1));
  model.state.bookmarks.splice(index,1);

  // render bookmark
  bookmark.renderBookmark(model.state.bookmarks);

  //add updated (with this bookmark removed) to local storage
  localStorage.setItem('bookmarks', JSON.stringify(model.state.bookmarks));
}


//update bookmarks on recipe reload
const updateBookmark = function(){
  model.state.bookmarks.forEach(bmark=>{
    if(bmark.id === window.location.hash.slice(1)){
      model.state.recipe.bookmarked = true;
      bookmark.fillBookmarkOnAdd();
    }
  });
}



//initialize main program

const init = function(){
  recipeView.addEventHandler(fetchDisplayRecipe);
  search.addSearchHandler(fetchDisplaySearchResults);
  result.addEventHandler(fetchDisplayRecipe);
  paging.addClickHandler(updatePages);
  bookmark.addBookmarkHandler(controlBookmark);
}

init();

