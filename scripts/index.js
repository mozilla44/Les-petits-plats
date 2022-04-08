import recipes from "/recipes.js";
import Recipe from "../model/Recipe.js";



function searchRecipe(input) {
    let result = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(input)) {
            result.push(recipe)
        }
    }
    return result

}


/* fonction d'affichage  */
function displayRecipe(listRecipe) {
    let recipeDom = "";
    for (let recipe of listRecipe) {
        recipe = new Recipe(recipe)
        recipeDom += recipe.createRecipeCard();
    }
    document.getElementById("recipe-area").innerHTML = recipeDom;
}





/* search by ingredient */

function SearchIngredients(input) {
    let result = [];
    for (let recipe of recipes) {
        if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) {
            result.push(recipe)
        }
    }
    return result

}

/* search by description */

function SearchDescription(input) {
    let result = [];
    for (let recipe of recipes) {
        if (recipe.description.toLowerCase().includes(input)) {
            result.push(recipe)
        }
    }
    return result

}
/* eventlistener with all search functions */

let searchbar = document.getElementById('search-bar');

searchbar.addEventListener("keyup", () => {
    let input = document.getElementById('search-bar').value
    if (input.length > 2){
    input = input.toLowerCase();
    let y = document.getElementsByClassName('recipe_card');
    let result = [];
    for (let card of y) {
        card.remove()
    }
    result = result.concat(searchRecipe(input));
    result = result.concat(SearchIngredients(input));
    result = result.concat(SearchDescription(input));

    result = [...new Set(result)]
    displayRecipe(result)
    }
    if (input.length == 0){
        displayRecipe(recipes)
    }
})



displayRecipe(recipes)


