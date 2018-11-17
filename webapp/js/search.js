$(document).ready(function() {

	var app = {}; // application object
	const APP_KEY = "bxIsZkPLBemsheW6F9cMwxaufuttp1HSkPqjsnixH8AgtcIbW5"; // application key from https://market.mashape.com/Dauntless27/applications/WikiCook


	// ANIMATIONS
	$(".view-prompt, .filter-options").hide();
	$('.result-box').on("mouseenter mouseleave", "figure", function() {
        var id = $(this).attr("data-id");
        $("#" + id).slideToggle(200);
	});

	$("#showfilter").click(function() {
	  $(".filter-options").slideToggle(200);
	});

	/**
	 * 	SEARCH RECIPES
	 *  Takes inputs from the document forms and append it to the url of the api endpoint.
	 */
	app.searchRecipes = function() {

		$('#noresults').hide();
		$('#startsearch').show();
		$('#startsearch').text("Searching...");
		$('figure').remove();

		let querySearch = $("#search-ingredient").val() != "" ? `&includeIngredients=${$("#search-ingredient").val()}` : ""; // ingredient/s query
		let cuisineArr = []; // cuisine of the recipe
		let cuisine = "";
		let intolerancesArr = []; // intolerances associated with the recipe
		let intolerances = ""; // intolerances associated with the recipe
		let diet= ""; // diets associated with the recipe
		let maxCalorie = $('#search-max-calorie').val() != 0 ? `&maxCalories=${$('#search-max-calorie').val()}` : ""; // maximum calorie
		let minCalorie = $('#search-min-calorie').val() != 0 ? `&minCalories=${$('#search-min-calorie').val()}` : ""; // minimum calorie
		let maxProtein = $('#search-max-protein').val() != 0 ? `&maxProtein=${$('#search-max-protein').val()}` : ""; // maximum protein
		let minProtein = $('#search-min-protein').val() != 0 ? `&minProtein=${$('#search-min-protein').val()}` : ""; // minimum protein
		let maxFat = $('#search-max-fat').val() != 0 ? `&maxFat=${$('#search-max-fat').val()}` : ""; // maximum fat
		let minFat = $('#search-min-fat').val() != 0 ? `&minFat=${$('#search-min-fat').val()}` : ""; // minimum fat
		let maxCarb = $('#search-max-carbs').val() != 0 ? `&maxCarbs=${$('#search-max-carbs').val()}` : ""; // maximum carbo
		let minCarb = $('#search-min-carbs').val() != 0 ? `&minCarbs=${$('#search-min-carbs').val()}` : ""; // minimum carbo

		for (let index = 0; index < document.getElementsByClassName('cuisine').length; index++) {

			if(document.getElementsByClassName('cuisine')[index].checked) {
				cuisineArr.push(document.getElementsByClassName('cuisine')[index].value)
			} else {
				continue;
			}

		}
		cuisine = cuisineArr.length == 0 ? "" : `&cuisine=${cuisineArr.join(",")}`;

		for (let index = 0; index < document.getElementsByClassName('intolerances').length; index++) {

			if(document.getElementsByClassName('intolerances')[index].checked) {
				intolerancesArr.push(document.getElementsByClassName('intolerances')[index].value)
			} else {
				continue;
			}

		}
		intolerances = intolerancesArr.length == 0 ? "" : `&intolerances=${intolerancesArr.join(",")}`;

		for (let index = 0; index < document.getElementsByClassName('diet').length; index++) {

			if(document.getElementsByClassName('diet')[index].checked) {
				diet = `&diet=${document.getElementsByClassName('diet')[index].value}`;
			} else {
				continue;
			}

		}

		let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true&instructionsRequired=true${querySearch}${cuisine}${intolerances}${diet}${maxCalorie}${maxCarb}${maxFat}${maxProtein}${minCalorie}${minCarb}${minFat}${minProtein}&number=20`; // api endpoint with parameters
		console.log(api_endpoint);
		$.ajax({
			url: api_endpoint,
			headers: {
				"X-Mashape-Key": APP_KEY,
				"Accept": "application/json"
			},
			success: function (data) {
				console.log(data.totalResults);
				if(data.totalResults == 0) {
					$('#startsearch').hide();
					document.getElementById('noresults').textContent = "No Results."
					$('#noresults').show();
				} else {
					$('#startsearch').hide();
					console.log("good");

					let i = 1;
					let counter = 0;
					$.each(data.results, (index, value) => {
						app.createResultSubBox(value.title, value.image, value.id, counter+1);
						counter++;
						i++;
					})
				}

		  },
			error: function (data) {
				window.alert("There's a problem.");
				window.reload();
		  }
		})

	}

	/**
	 * GET RECIPE INFORMATION
	 */
	app.getRecipeInformation = function () {

		let recipe_id = $(this).attr("id"); // id of the recipe
		let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipe_id}/information?includeNutrition=true`; // api endpoint with parameters
		$.ajax({
			url: api_endpoint,
			headers: {
				"X-Mashape-Key": APP_KEY,
				"Accept": "application/json"
			},
			success: function (data) {
				app.createRecipeInfoBox(data);
		  },
			error: function (data) {
				window.alert("There's a problem.");
				window.reload();
		  }
		})

	}

	app.searchVideos = function () {

		let query = $("#search-ingredient").val();
		let youtube_embed = "https://www.youtube.com/embed/";
		let api_endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/videos/search?number=3&query=${query}`; // api endpoint with parameters
		$.ajax({
			url: api_endpoint,
			headers: {
				"X-Mashape-Key": APP_KEY,
				"Accept": "application/json"
			},
			success: function (data) {
				$.each(data.videos, (index, value) => {
					let iframe = document.createElement("iframe");
					iframe.setAttribute("src", youtube_embed + value.youTubeId);
					document.getElementById('list-videos').appendChild(iframe);
				})
		  },
			error: function (data) {
				window.alert("There's a problem.");
				window.reload();
		  }
		})
	}

	/**
	 * CREATE RESULT BOXES PER RECIPE
	 * Parameter/s: title of the recipe, image url of the recipe, id of the recipe, counter 1, counter 2
	 * Dynamically create boxes in the html document for the searched recipes
	 */
	app.createResultSubBox = function (title, image, id, counter) {

		$('#startsearch').hide();
		// DOM Manipulation

		// create elements
		let figure = document.createElement('figure'); // create figure element
		let image_div = document.createElement('div'); // create div element
		let title_div = document.createElement('div'); // create div element
		let h5 = document.createElement('h5'); // create h3 element
		let viewbutton = document.createElement('button'); // create viewbutton element

		// set contents and attributes to the elements
		figure.setAttribute("class", "result-subbox");
		figure.setAttribute("data-id", id);
		image_div.setAttribute("class", "image-section");
		image_div.setAttribute("style", "background-image: url(" + image + ")");
		title_div.setAttribute("class", "title-section");
		h5.setAttribute("id", "recipe-title" + counter);
		h5.textContent = title;
		viewbutton.textContent = "View Recipe";
		viewbutton.setAttribute("class", "cover btn btn-primary");
		viewbutton.setAttribute("id", id);

		// append elements
		title_div.appendChild(h5);
		title_div.appendChild(viewbutton);
		figure.appendChild(title_div);
		figure.appendChild(image_div);
		document.getElementsByClassName("result-box")[0].appendChild(figure);

	}

	/**
	 * CREATES RECIPE INFORMATION BOX
	 * Parameter/s: recipe object
	 * Dynamically creates a box in the html document for the recipe information
	 */
	app.createRecipeInfoBox = function (recipe) {

		$(".result-box").fadeOut(100);

		//DOM Manipulation

		// create elements
		let mainDiv = document.createElement('div');
		let titleHeader = document.createElement('h1');
		let imageContainerDiv = document.createElement('div');
		let videoDiv = document.createElement('div');
		let h4video = document.createElement('h4');
		let videoslistDiv = document.createElement('div');
		let img = document.createElement('img');
		let ingredientsContainerDiv = document.createElement('div');
		let h4_ingre = document.createElement('h4');
		let ingreListDiv = document.createElement('div');
		let list_ingredients_ul = document.createElement('ul');
		let nutritionFacts_div = document.createElement('div');
		let h4_nutri = document.createElement('h4');
		let main_div_table = document.createElement('div');
		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let thLabel = document.createElement('th');
		let thQuantity = document.createElement('th');
		let tbody = document.createElement('tbody');

		// set contents and attributes of the elements
		h4_ingre.textContent = "Ingredients";
		h4_nutri.textContent = "Nutrition Facts";
		mainDiv.setAttribute("class","recipe-info");
		mainDiv.setAttribute("id","one");
		titleHeader.setAttribute("class","recipe-info-title");
		titleHeader.textContent = recipe.title;
		titleHeader.setAttribute("id","info-title1");
		imageContainerDiv.setAttribute("class","recipe-info-content image-container");
		videoDiv.setAttribute("id", "recipe-videos");
		h4video.textContent = "Related Videos"
		videoslistDiv.setAttribute("id", "list-videos")
		img.setAttribute("class","image-container-box");
		img.setAttribute("id","image-container1");
		img.setAttribute("src", recipe.image);
		ingredientsContainerDiv.setAttribute("class","recipe-info-content ingredients-container");
		ingreListDiv.setAttribute("class","ingredients-container-list");
		list_ingredients_ul.setAttribute("class","list-group");
		nutritionFacts_div.setAttribute("class","recipe-info-content nutritionfacts-container");
		main_div_table.setAttribute("class","nutritionfacts-container-table");
		table.setAttribute("class","table table-striped");
		thLabel.setAttribute("scope","col");
		thLabel.textContent = "Nutrient";
		thQuantity.setAttribute("scope","col");
		thQuantity.textContent = "Amount";

		// append elements
		videoDiv.appendChild(h4video);
		imageContainerDiv.appendChild(img);
		imageContainerDiv.appendChild(videoDiv);
		imageContainerDiv.appendChild(videoslistDiv);
		ingredientsContainerDiv.appendChild(h4_ingre);
		ingredientsContainerDiv.appendChild(ingreListDiv);
		ingreListDiv.appendChild(list_ingredients_ul);
		nutritionFacts_div.appendChild(h4_nutri);
		nutritionFacts_div.appendChild(main_div_table);
		main_div_table.appendChild(table);
		table.appendChild(thead);
		table.appendChild(tbody);
		thead.appendChild(thLabel);
		thead.appendChild(thQuantity);
		mainDiv.appendChild(titleHeader);
		mainDiv.appendChild(imageContainerDiv);
		mainDiv.appendChild(ingredientsContainerDiv);
		mainDiv.appendChild(nutritionFacts_div);
		mainDiv.appendChild(nutritionFacts_div);
		document.getElementsByClassName('result')[0].appendChild(mainDiv);

		app.searchVideos();
		app.displayInfo(app.getIngredients(recipe), app.getNutritionFacts(recipe));

	}

	/**
	 * DISPLAY INFORMATION IN THE RECIPE INFORMATION BOX
	 * Parameter/s: ingredients of the recipe, nutritions associated with the recipe
	 * Display the ingrdients and nutrition facts of the recipe by creating new elements
	 */
	app.displayInfo = function (ingredients, nutrition) {

		// Creates a table for the nutrition facts of a recipe
		for (let x = 0; x < nutrition[0].length; x++) {
			let tr = document.createElement('tr');
			let tdLabel = document.createElement('td');
			let tdQuantity = document.createElement('td');
			tdLabel.textContent = nutrition[0][x].title;
			tdQuantity.textContent = nutrition[0][x].amount + " " + nutrition[0][x].unit;
			tr.appendChild(tdLabel);
			tr.appendChild(tdQuantity);
			document.getElementsByTagName('tbody')[0].appendChild(tr);
		}

		// Creates a table for the ingredients of a recipe
		for (let x = 0; x < ingredients[0].length; x++) {
			let li = document.createElement("li");
			li.textContent = ingredients[0][x].originalString;
			li.setAttribute('class', 'list-group-item');
			document.getElementsByClassName('list-group')[0].appendChild(li);
		}

	}

	/**
	 * GET NUTRITIONS FROM THE DATA(JSON)
	 * Parameter/s: recipe
	 * Returns an array containing nutritions
	 */
	app.getNutritionFacts = function (recipe) {

		let i = 0; // counter
		let recipe_nutrition = []; // array for nutritions per recipe

		$.each(recipe.nutrition.nutrients, (index, value) => {
			recipe_nutrition[i] = recipe.nutrition.nutrients;
			i++;
			return false;
		}); // put nutrition per recipe(array) in the array(nested array)

		return recipe_nutrition;

	}

	/**
	 * GET INGREDIENTS FROM THE DATA(JSON)
	 * Parameter/s: recipe
	 * Returns an array containing ingredients
	 */
	app.getIngredients = function (recipe) {

		let i = 0; // counter
		let ingredients = []; // array for ingredients per recipe

		$.each(recipe.extendedIngredients, (index, value) => {
			ingredients[i] = recipe.extendedIngredients;
			i++;
			return false;
		}); // put ingredients per recipe(array) in the array(nested array)

		return ingredients;

	}

	$('.result').on("click", "button", function() {
		$('.recipe-info').fadeOut(500);
		$(".result-box").fadeIn(1000);
	})
	$('.result-box').on("click", "button", app.getRecipeInformation);
	app.start = document.getElementById('search-recipe-ingredients').addEventListener("click", app.searchRecipes);


}); // end
