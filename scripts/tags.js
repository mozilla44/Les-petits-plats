const listOfIngredients = [];
const listOfAppliances = [];
const listOfUtensils = [];



/* rechercher dans la liste filtrée  */
function searchIngredient(input) {
    let result = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(input)) {
            result.push(recipe)
        }
    }
    return result

}

document.querySelectorAll('[data-component="combobox"]').forEach(element => {
    var p1 = new Combobox(element);
})




