

class combobox {
    constructor(element, list) {
        this.element = element;
        this.list = list;
        this.element.innerHTML= "";

        this.input = document.createElement("input");
        this.input.classList.add("combo");
        this.element.appendChild(this.input);
        this.text = this.element.dataset.text.substring(0,1).toUpperCase() + this.element.dataset.text.substring(1)
        this.input.setAttribute("placeholder" , "Rechercher un " + this.element.dataset.text)
        this.input.value = this.text
        this.comboList = document.createElement("div");
        this.comboList.classList.add("comboList");
        this.element.appendChild(this.comboList);


        this.input.addEventListener("keyup", () => {
            this.showCombo()
        })
        this.input.addEventListener("focus", () => {
            if (this.input.value == this.text){
                this.input.value = "";
            }
            
            this.showCombo();
        })

        this.input.addEventListener("blur", () => {
            if (this.input.value == ""){
                this.input.value = this.text;
            }
            
            this.hideCombo();
        })
    }

    showCombo() {

        this.comboList.innerHTML = "";
        let filteredList = this.list.filter(option => option.includes(this.input.value))

        for (let option of filteredList) {
            this.comboList.insertAdjacentHTML("beforeend", `<div class="option" data-value="${option}">${option}</div>`);
        }

    }

    hideCombo (){
        this.comboList.querySelectorAll(".option").forEach(element => {
            element.remove()
        });
    }
}
