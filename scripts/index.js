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
    if (input.length > 2) {
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

        /* console.log(GetFIlteredIngredients(result))
        console.log(GetFIlteredUstensils(result))
        console.log(GetFilteredAppliances(result)) */
        displayCombo(result)
        displayRecipe(result)
    }
    if (input.length == 0) {
        displayRecipe(recipes)
    }
})

displayRecipe(recipes)



/* filter by ingredients */
function GetFIlteredIngredients(listRecipe) {
    let ingredient = []

    for (let recipe of listRecipe) {
        ingredient = ingredient.concat(recipe.ingredients.map(i => {

            return i.ingredient.substring(0, 1).toUpperCase() + i.ingredient.substring(1).toLowerCase()
        }
        ))
    }
    ingredient = [...new Set(ingredient)]
    return ingredient

}



/* filter by ustensils */

function GetFIlteredUstensils(listRecipe) {
    let ustensil = []

    for (let recipe of listRecipe) {
        ustensil = ustensil.concat(recipe.ustensils.map(i => {

            return i.substring(0, 1).toUpperCase() + i.substring(1).toLowerCase()
        }
        ))
    }
    ustensil = [...new Set(ustensil)]
    return ustensil

}



/* filter by appliance */

function GetFilteredAppliances(listRecipe) {
    let appliance = []

    for (let recipe of listRecipe) {
        appliance.push(recipe.appliance)
    }
    appliance = [...new Set(appliance)]
    return appliance

}




function displayCombo (listRecipe){
    let filterIngredient = GetFIlteredIngredients(listRecipe);
    let combo = new combobox(document.querySelector(`.combobox[data-list="ingredient"]`),filterIngredient)
}

displayCombo(recipes);



