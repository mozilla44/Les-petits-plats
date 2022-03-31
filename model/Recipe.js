export default class Recipe {
    constructor(recipe) {
        Object.assign(this, recipe)
    }

    createRecipeCard() {

        return `<div class="recipe_card">
    <div class="recipe_image">
    </div>
    <div class="recipe-intro">
    <div class="recipe-name">${this.name}</div>
    <i class="fa-light fa-clock"></i>
    <div class="recipe-time">&nbsp;${this.time}&nbsp;mn</div>
    </div>
    <div class="all-ingredients">${this.ingredients.map(ingredient => {
      let ingredientDom = `<div class="ingredients">${ingredient.ingredient}:&nbsp;`
      if (ingredient.quantity){
          ingredientDom += `<div class="quantity">${ingredient.quantity}&nbsp;</div>`
      }
      if (ingredient.unit){
          ingredientDom += `<div class="unit">${ingredient.unit}</div>`
      }
      ingredientDom += "</div>"
      return ingredientDom
      
    }).join("")}</div>
    <div class="recipe_instructions">${this.description}</div>
</div>`

    }
}