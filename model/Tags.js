

class combobox {
    constructor(element, list) {
        this.element = element;
        this.list = list;
        this.element.innerHTML= "";

        this.input = document.createElement("input");
        this.input.classList.add("combo");
        this.element.appendChild(this.input);

        this.comboList = document.createElement("div");
        this.comboList.classList.add("comboList");
        this.element.appendChild(this.comboList);


        this.input.addEventListener("keyup", () => {
            this.showCombo()
        })
        this.input.addEventListener("focus", () => {
            this.showCombo()
        })
    }

    showCombo() {

        this.comboList.innerHTML = "";
        let filteredList = this.list.filter(option => option.includes(this.input.value))

        for (let option of filteredList) {
            this.comboList.insertAdjacentHTML("beforeend", `<div class="option" data-value="${option}">${option}</div>`);
        }

    }
}
