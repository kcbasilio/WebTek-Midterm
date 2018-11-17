$(document).ready(function () {

	const APP_KEY = "bxIsZkPLBemsheW6F9cMwxaufuttp1HSkPqjsnixH8AgtcIbW5";

	$("#random-recipe-nutritions").hide();

	$("#ingre-tab").click(function () {
		$("#random-recipe-ingredients").slideDown(500);
		$("#random-recipe-nutritions").slideUp(500);
		$(this).addClass("active");
		$("#nutri-tab").removeClass("active");
	})
	$("#nutri-tab").click(function () {
		$("#random-recipe-nutritions").slideDown(500);
		$("#random-recipe-ingredients").slideUp(500);
		$(this).addClass("active");
		$("#ingre-tab").removeClass("active");
	})

	function getRandomRecipe() {

		let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1`; // api endpoint with parameters
		$.ajax({
			url: api_endpoint,
			headers: {
				"X-Mashape-Key": APP_KEY,
				"Accept": "application/json"
			},
			success: function (data) {
				$.each(data.recipes, (index, value) => {
					getRecipeInformation(value.id);
				})
			 },
			error: function (data) {
			  	console.log(data);
			 }
		})

	}

	function getRecipeInformation(id) {

		let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=true`; // api endpoint with parameters
		$.ajax({
			url: api_endpoint,
			headers: {
				"X-Mashape-Key": APP_KEY,
				"Accept": "application/json"
			},
			success: function (data) {
				displayRecipe(data.title,data.image,data.extendedIngredients, data.nutrition.nutrients);
		  },
			error: function (data) {
		  	console.log(data);
		  }
		})

	}

	function displayRecipe(title, image, ingredients, nutritions) {

		document.getElementById('random-recipe-title').textContent = title;
		document.getElementById('image-section').setAttribute("style", `background-image: url(${image});`);

		let recipe_nutritions = [nutritions];
		let recipe_ingredients = [ingredients];
		for (let x = 0; x < recipe_nutritions[0].length; x++) {
			let tr = document.createElement('tr');
			let tdLabel = document.createElement('td');
			let tdQuantity = document.createElement('td');
			tdLabel.textContent = recipe_nutritions[0][x].title;
			tdQuantity.textContent = recipe_nutritions[0][x].amount + " " + recipe_nutritions[0][x].unit;
			tr.appendChild(tdLabel);
			tr.appendChild(tdQuantity);
			document.getElementsByTagName('tbody')[0].appendChild(tr);
		}

		for (let x = 0; x < recipe_ingredients[0].length; x++) {
			let li = document.createElement("li");
			li.textContent = recipe_ingredients[0][x].originalString;
			li.setAttribute('class', 'list-group-item');
			document.getElementsByClassName('list-group')[0].appendChild(li);
		}

	}


	var button = document.getElementById('random-button');
	button.addEventListener("click", getRandomRecipe);

	var button2 = document.getElementById('secondrandom-btn');
	button2.addEventListener("click", getRandomRecipe);
})
