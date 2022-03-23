import recipes from "/recipes.js";
import Recipe from "../model/Recipe.js";



function searchRecipe() {
    let input = document.getElementById('search-bar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('recipe_card');
    let result = []; 
    
    for (i = 0; i < x.length; i++) { 
        x[i].style.display="none";
        if (x[i].innerHTML.toLowerCase().includes(input)) {
            result.push(x[i])
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

displayRecipe(recipes)

