// Generate tags in dropdown menu depending on filtered recipes
export const generateTags = (array) => {
	// Arrays
	const listOfIngredients = [];
	const listOfAppliances = [];
	const listOfUtensils = [];

	// Push items in arrays
	array.forEach(element => {
		element.ingredients.forEach(elt => {
			listOfIngredients.push(elt.ingredient);
		});
		listOfAppliances.push(element.appliance);
		element.ustensils.forEach(elt => {
			listOfUtensils.push(elt);
		});
	});

	// remove duplicates in arrays
	const ingredientsSet = new Set(listOfIngredients); // set return an object with unique values
	const appliancesSet = new Set(listOfAppliances);
	const utensilsSet = new Set(listOfUtensils);
	const ingredientsKeywords = [...ingredientsSet]; // Spread allows to convert object to array
	const appliancesKeywords = [...appliancesSet];
	const utensilsKeywords = [...utensilsSet];

	return [ingredientsKeywords, appliancesKeywords, utensilsKeywords];
};

// Create tags btn in html dropdown Menus (take an array like [[], [], []])
export const createTags = (keywords) => {
	// push arrays in html menu
	const pushItemsInHtml = (arrayOfKeywords, htmlMenu, type) => {
		arrayOfKeywords.forEach(element => {
			const menuItem = document.createElement('a');
			menuItem.innerHTML = element;
			menuItem.classList.add('dropdown-item', 'show-tag', type);
			htmlMenu.appendChild(menuItem);
		});
	};
	// DOM elements 
	const ingredientsMenu = document.getElementById('ingredients-dropdown-menu');
	const appliancesMenu = document.getElementById('appliances-dropdown-menu');
	const utensilsMenu = document.getElementById('utensils-dropdown-menu');

	pushItemsInHtml(keywords[0], ingredientsMenu, 'ingredient-tag');
	pushItemsInHtml(keywords[1], appliancesMenu, 'appliance-tag');
	pushItemsInHtml(keywords[2], utensilsMenu, 'utensil-tag');
};

// show only available Tags in dropDown menu depending on search and already selected tags
export const showAvailableTags = (array, alreadySelectedTags) => {
	let tagsToShow = generateTags(array);
	tagsToShow = tagsToShow[0].concat(tagsToShow[1], tagsToShow[2]);

	const htmlCurrentTags = document.getElementsByClassName('dropdown-item');
	const currentTags = Array.from(htmlCurrentTags);

	currentTags.forEach(tag => {
		if(tagsToShow.some(elt => elt === tag.textContent)){
			tag.classList.remove('hide-tag');
			tag.classList.add('show-tag');
		}else{
			tag.classList.remove('show-tag');
			tag.classList.add('hide-tag');
		}

		if(alreadySelectedTags.some(elt => elt.name === tag.textContent.toUpperCase())){
			tag.classList.remove('show-tag');
			tag.classList.add('hide-tag');
		}
	});
};

