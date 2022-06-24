
function searchRecipe(input) {
    let result = []
    recipes.forEach((recipe) => {
        if (recipe.name.toLowerCase().includes(input)) {
            result.push(recipe)
        }

    });
    return result;
}

/* filter */

/* function searchRecipe(input){
    return recipes.filter (recipe => recipe.name.toLowerCase().includes(input))
    
} */

/* search by ingredient */

function SearchIngredients(input) {
    let result = [];

    recipes.forEach((recipe) => {
        if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input))) {
            result.push(recipe)
        }
    })
    return result
}

/* search by description */

function SearchDescription(input) {
    let result = [];
    recipes.forEach((recipe) =>{
        if (recipe.description.toLowerCase().includes(input)) {
            result.push(recipe)
        }
    })
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

/* eventlistener with all search functions */

let searchbar = document.getElementById('search-bar');

searchbar.addEventListener("keyup", () => {
    let input = document.getElementById('search-bar').value
    if (input.length > 2) {
        input = input.toLowerCase();
        let y = document.getElementsByClassName('recipe_card');

        for (let card of y) {
            card.remove()
        }
        filterRecipe();
    }
    if (input.length == 0) {
        displayRecipe(recipes)
    }
})

displayRecipe(recipes)

function filterRecipe() {
    let input = document.getElementById('search-bar').value
    let result = [];
    result = result.concat(searchRecipe(input));
    result = result.concat(SearchIngredients(input));
    result = result.concat(SearchDescription(input));
    result = [...new Set(result)]
    let listtag = listcombo.map(combo => combo.listTags).flat()
    for (let tag of listtag) {
        switch (tag.type) {
            case "ingredient":
                result = result.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient == tag.value))
                break;

            case "appliance":
                result = result.filter(recipe => recipe.appliance == tag.value)
                break;

            case "ustensils":
                result = result.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase() == tag.value.toLowerCase()))
                break;
        }
    }


    displayCombo(result)
    displayRecipe(result)
}


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


let listcombo = []

listcombo.push(new combobox(document.querySelector(`.combobox[data-list="ingredient"]`), GetFIlteredIngredients))
listcombo.push(new combobox(document.querySelector(`.combobox[data-list="appliance"]`), GetFilteredAppliances))
listcombo.push(new combobox(document.querySelector('.combobox[data-list="ustensils"]'), GetFIlteredUstensils))

function displayCombo(listRecipe) {
    for (let combo of listcombo) {
        combo.list = combo.filter(listRecipe)
    }
}

displayCombo(recipes);



