export default class Recipe {
    constructor(recipe) {
        Object.assign(this, recipe)
    }

    createRecipeCard() {

        return `<div class="recipe_card">
    <div class="recipe_image">
    </div>
    <div class="recipe-intro">${this.name}</div>
    <div class="ingredients">${this.ingredients.map(ingredient => {
      let ingredientDom = `<div class="ingredients">${ingredient.ingredient}`
      if (ingredient.quantity){
          ingredientDom += `<div class="quantity">${ingredient.quantity}</div>`
      }
      if (ingredient.unit){
          ingredientDom += `<div class="unit">${ingredient.unit}</div>`
      }
      ingredientDom += "</div>"
      return ingredientDom
      
    }).join("")}</div>
    <div class="recipe_instructions"></div>
</div>`

    }
}