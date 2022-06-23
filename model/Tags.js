

class combobox {
    constructor(element, filter) {
        this.filter = filter;
        this.listTags = [];
        this.element = element;
        this.list = [];
        this.element.innerHTML = "";
        this.searchbox = document.createElement("div")
        this.searchbox.classList.add("searchbox")

        this.input = document.createElement("input");
        this.input.classList.add("combo");
        this.searchbox.appendChild(this.input);
        this.searchbox.insertAdjacentHTML('beforeend', '<i class="fas fa-chevron-down"></i>');
        this.element.appendChild(this.searchbox)
        this.text = this.element.dataset.text.substring(0, 1).toUpperCase() + this.element.dataset.text.substring(1)
        this.input.setAttribute("placeholder", "Rechercher un " + this.element.dataset.text)
        this.input.value = this.text
        this.comboList = document.createElement("div");
        this.comboList.classList.add("comboList");
        this.element.appendChild(this.comboList);


        this.input.addEventListener("keyup", () => {
            this.showCombo()
        })
        this.input.addEventListener("focus", () => {
            if (this.input.value == this.text) {
                this.input.value = "";
            }

            this.showCombo();
        })

        document.addEventListener("click", (event) => {
            if ((event.target.classList != undefined && event.target.classList.contains(".combobox") && event.target != this.element) || (event.target.closest(".combobox") != this.element)) {
                if (this.input.value == "") {
                    this.input.value = this.text;
                }

                this.hideCombo()
            }
        })
    }

    showCombo() {

        this.comboList.innerHTML = "";
        let filteredList = this.list.filter(option => option.toLowerCase().includes(this.input.value.toLowerCase()))
        filteredList = filteredList.filter(option => !this.listTags.some(tag => tag.value == option))
        for (let option of filteredList) {
            this.comboList.insertAdjacentHTML("beforeend", `<div class="option" data-value="${option}">${option}</div>`);
        }
        this.addTag()
        if (!this.searchbox.querySelector(".fas").classList.contains("rotate")) {
            this.searchbox.querySelector(".fas").classList.add("rotate")
        }

    }

    hideCombo() {
        this.comboList.querySelectorAll(".option").forEach(element => {
            element.remove()
        });
        this.searchbox.querySelector(".fas").classList.remove("rotate")
    }

    addTag() {
        this.comboList.querySelectorAll('.option').forEach(element => {
            element.addEventListener("click", (event) => {

                var tag = {
                    value: event.target.dataset.value,
                    type: event.target.closest(".combobox").dataset.list
                };
                var tagBtn = document.createElement('div');
                tagBtn.dataset.value = tag.value
                tagBtn.dataset.type = tag.type
                tagBtn.innerHTML = tag.value + `<i class="fas fa-times"></i>`;
                tagBtn.classList.add("activated-tag")
                tagBtn.classList.add(event.target.closest(".combobox").dataset.list)
                document.getElementById("tags-area").appendChild(tagBtn)
                console.log(event.target.dataset.value)
                this.removeTag(tagBtn)
                this.listTags.push(tag)
                filterRecipe();
                this.showCombo();

            })
        })
    }

    removeTag(tagBtn) {
        tagBtn.querySelector(".fa-times").addEventListener("click", (event) => {
            event.target.closest(".activated-tag").remove();
            let currentTag = event.target.closest(".activated-tag").dataset
            this.listTags = this.listTags.filter(tag => tag.type != currentTag.type || tag.value != currentTag.value)

            filterRecipe();


        })
    }
}
