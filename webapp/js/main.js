$(document).ready(function() {

	var app = {}; // app object
	const APP_KEY = "bxIsZkPLBemsheW6F9cMwxaufuttp1HSkPqjsnixH8AgtcIbW5"; // application key from https://market.mashape.com/Dauntless27/applications/WikiCook

	/*
	Search Recipes By Ingredients
	*/
	app.searchRecipesByIngredients = function() {

		let querySearch = $("#search-ingredient").val(); // ingredient/s query
		// let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${querySearch}&fillIngredients=true&number=10`; // api endpoint with parameters
		$.ajax({
			url: '../json/searchbyingredients.json',
			// headers: {
			// 	"X-Mashape-Key": APP_KEY,
			// 	"Accept": "application/json"
			// },
			success: function (data) {
				let i = 1;
				let counter = 0;
				$.each(data, (index, value) => {
					$("#info-title" + i).text(value.title);
					$("#image-container" + i).attr("src", value.image);
					app.getRecipeInformation(value.id, counter);
					app.createResultSubBox(value.title, value.image, counter+1);
					counter++;
					i++;
				})
		  },
			error: function (data) {
		  	console.log(data);
		  }
		})

	}

	/*
	Search Recipes By Nutrients(Calorie, Protein, Fat, Carbo)
	*/
	app.searchRecipeByNutrients = function() {

		let maxCalorie = $('#search-max-calorie').val();
		let minCalorie = $('#search-min-calorie').val();
		let maxProtein = $('#search-max-protein').val();
		let minProtein = $('#search-min-protein').val();
		let maxFat = $('#search-max-fat').val();
		let minFat = $('#search-min-fat').val();
		let maxCarb = $('#search-max-carbs').val();
		let minCarb = $('#search-min-carbs').val();
		// let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?maxCalories=${maxCalorie}&maxCarbs=${maxCarb}&maxFat=${maxFat}&maxProtein=${maxProtein}&minCalories=${maxCarb}&minCarbs=${minCarb}&minFat=${minFat}&minProtein=${minProtein}`;  // api endpoint with parameters
		$.ajax({
			url: '../json/searchbynutrients.json',
			// headers: {
			// 	"X-Mashape-Key": APP_KEY,
			// 	"Accept": "application/json"
			// },
			success: function (data) {
				let i = 1;
				let counter = 0;
				$.each(data, (index, value) => {
					$("#info-title" + i).text(value.title);
					$("#image-container" + i).attr("src", value.image);
					app.getRecipeInformation(value.id, counter);
					app.createResultSubBox(value.title, value.image, counter+1);
					counter++;
					i++;
				})
		  },
			error: function (data) {
		  	console.log(data);
		  }
		})

	}

	/*
	Get Recipe Informations
	*/
	app.getRecipeInformation = function(id, counter) {

		// let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=true`;
		let allIngredients = [];
		$.ajax({
			url: `../json/${id}.json`,
			// headers: {
			// 	"X-Mashape-Key": APP_KEY,
			// 	"Accept": "application/json"
			// },
			success: function (data) {
				let c = 0;
				$.each(data, () => {
					app.displayIngredients(data, counter);
					app.displayNutritionFacts(data, counter);
					return false;
				});
		  },
			error: function (data) {
		  	console.log(data);
		  }
		})

	}

	/*
	Classify Cuisine of recipe
	*/
	app.classifyCuisineOfRecipe = function (ingredientList, title) {

		// let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition`;
		//
		// $.ajax({
		// 	type: 'POST',
		// 	url: api_endpoint,
		// 	headers: {
		// 		"X-Mashape-Key": app_key,
		// 		"Accept": "application/json"
		// 	},
		// 	data: {
		// 		'ingredientList': ingredientList,
		// 		'title': title
		// 	}
		// 	success: function(data) {
		//     console.log(data);
		//   },
		// 	error: function(data) {
		//   	console.log(data);
		//   }
		// })

	}

	/*
	Display Recipe Ingredients
	*/
	app.displayIngredients = function (ingredients, counter) {

		let i = 0;
		let recipe_ingredient = []; // array for ingredients per recipe

		$.each(ingredients.extendedIngredients, (index, value) => {
			recipe_ingredient[i] = ingredients.extendedIngredients;
			i++;
			return false;
		}); // put ingredients per recipe(array) in the array(nested array)

		for (let x = 0; x < recipe_ingredient[0].length; x++) {
				let li = document.createElement("li"); // create <li> element
				li.textContent = recipe_ingredient[0][x].originalString; // set the ingredient as text of the created element
				li.setAttribute('class', 'list-group-item'); // set class attribute value to add style
				document.getElementsByClassName('list-group')[counter].appendChild(li); // append element to the ul
		}

	}

	/*
	Display Recipe Nutrition
	*/
	app.displayNutritionFacts = function (ingredients, counter) {

		let i = 0;
		let recipe_nutrition = []; // array for nutritions per recipe

		$.each(ingredients.nutrition.nutrients, (index, value) => {
			recipe_nutrition[i] = ingredients.nutrition.nutrients;
			i++;
			return false;
		}); // put nutrition per recipe(array) in the array(nested array)

		for (let x = 0; x < recipe_nutrition[0].length; x++) {
			let tr = document.createElement('tr');
			let tdLabel = document.createElement('td');
			let tdQuantity = document.createElement('td');
			tdLabel.textContent = recipe_nutrition[0][x].title;
			tdQuantity.textContent = recipe_nutrition[0][x].amount + " " + recipe_nutrition[0][x].unit;
			tr.appendChild(tdLabel);
			tr.appendChild(tdQuantity);
			document.getElementsByTagName('tbody')[counter].appendChild(tr);
		}
	}

	app.createResultSubBox = function (title, image, counter) {

		let dataNumber = ["one","two","three","four","five","six","seven","eight","nine","ten"];

		let figure = document.createElement('figure');
		let image_div = document.createElement('div');
		let title_div = document.createElement('div');
		let h1 = document.createElement('h1');
		figure.setAttribute("class", "result-subbox");
		figure.setAttribute("data-number", dataNumber[counter-1]);
		image_div.setAttribute("class", "image-section");
		image_div.setAttribute("style", "background-image: url(" + image + ")");
		title_div.setAttribute("class", "title-section");
		h1.setAttribute("class", "lead display-4");
		h1.setAttribute("id", "recipe-title" + counter);
		h1.textContent = title;
		title_div.appendChild(h1);
		figure.appendChild(image_div);
		figure.appendChild(title_div);
		document.getElementsByClassName("result-box")[0].appendChild(figure);

	}

	app.start = document.getElementById('search-recipe-ingredients').addEventListener("click", app.searchRecipesByIngredients);
	app.start = document.getElementById('search-recipe-nutritions').addEventListener("click", app.searchRecipeByNutrients);

});
