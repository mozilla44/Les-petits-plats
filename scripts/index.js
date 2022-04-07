import recipes from "/recipes.js";
import Recipe from "../model/Recipe.js";



function searchRecipe() {
    let input = document.getElementById('search-bar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('recipe_card');
    let result = []; 
    for (let card of x){
        card.remove()
    }
    for (let recipe of recipes){
        if (recipe.name.includes(input)){
            result.push(recipe)
        }
    }
    
    
    displayRecipe(result)
}


/* fonction d'affichage  */
function displayRecipe (listRecipe){
    let recipeDom = "";
    for (let recipe of listRecipe ){
        recipe = new Recipe(recipe)
        recipeDom += recipe.createRecipeCard();
    }
    document.getElementById("recipe-area").innerHTML = recipeDom;
}

let searchbar = document.getElementById('search-bar');
searchbar.addEventListener("keyup" ,searchRecipe)


/* search by ingredient */



/* function SearchIngredients (){
    let input = document.getElementById('search-bar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('recipe_card');
    let result = []; 
    for (let card of x){
        card.remove()
    }
    for (let recipe of recipes){
        if (recipe.ingredient.includes(input)){
            result.push(recipe)
        }
    }
    
    
    displayRecipe(result)
} */

/* search by description */

/* function SearchDescription (){
    let input = document.getElementById('search-bar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('recipe_card');
    let result = []; 
    for (let card of x){
        card.remove()
    }
    for (let recipe of recipes){
        if (recipe.description.includes(input)){
            result.push(recipe)
        }
    }
    
    
    displayRecipe(result)
} */

/* eventlistener with all search functions */

/* searchbar.addEventListener("keyup" ,() => {
    searchRecipe();
    SearchIngredients();
    SearchDescription();

}) */



displayRecipe(recipes)


