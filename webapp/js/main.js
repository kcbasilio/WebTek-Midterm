$(document).ready(function() {
	var domain = "https://api.edamam.com/search"; // domain
	var app_id = "40cae619"; // application id (developer.edamam.com) 
	var app_key = "1b6db03230c404ca39f1ea74de1724fc"; // application key (developer.edamam.com) 
	$("#submit-recipe").click( function() {
		let query = $("#recipe").val(); // get input of the user
		$.getJSON(domain + "?q=" + query + "&app_id=" + app_id + "&app_key=" + app_key, function(data) {
			let counter = 1;
			let allRecipes = [];
			$.each(data, function() {			
				$.each(data.hits, function(index, value) {
					let recipe = {
						label: value.recipe.label,
						image: value.recipe.image,
						calories: value.recipe.calories,
						ingredients: value.recipe.ingredientLines,
						dietLabels: value.recipe.dietLabels,
						healthLabels: value.recipe.healthLabels,
						nutrients: {
							energy: value.recipe.totalNutrients.ENERC_KCAL,
							fat: value.recipe.totalNutrients.FAT,
							chocdf: value.recipe.totalNutrients.CHOCDF,
							sugar: value.recipe.totalNutrients.SUGAR,
							protein: value.recipe.totalNutrients.PROCNT,
							cholesterol: value.recipe.totalNutrients.CHOLE,
							sodium: value.recipe.totalNutrients.NA,
							calcium: value.recipe.totalNutrients.CA,
							magnesium: value.recipe.totalNutrients.MG,
							potassium: value.recipe.totalNutrients.K,
							iron: value.recipe.totalNutrients.FE,
							zinc: value.recipe.totalNutrients.ZN,
							phosphorus: value.recipe.totalNutrients.P,
							vitA: value.recipe.totalNutrients.VITA_RAE,
							vitb6: value.recipe.totalNutrients.VITB6A,
							vitD: value.recipe.totalNutrients.VITD,
							vitE: value.recipe.totalNutrients.TOCPHA,
							vitK: value.recipe.totalNutrients.VITK1
						}

					}
					allRecipes[counter] = recipe;

					counter++;
				});
				return false;
			});
			for (let i in allRecipes) {
				$("#recipe-title" + i).text(allRecipes[i].label);
				$("#info-title" + i).text(allRecipes[i].label);
				$("#result-subbox-image" + i).attr("src", allRecipes[i].image);
				$("#image-container" + i).attr("src", allRecipes[i].image);
			}
			// nutrition facts
			for (let i in allRecipes) {
				$("#energy" + i).text(allRecipes[i].nutrients.energy.quantity.toFixed(2) + " " + allRecipes[i].nutrients.energy.unit);
				$("#fat" + i).text(allRecipes[i].nutrients.fat.quantity.toFixed(2) + " " + allRecipes[i].nutrients.fat.unit);
				$("#chocdf" + i).text(allRecipes[i].nutrients.chocdf.quantity.toFixed(2) + " " + allRecipes[i].nutrients.chocdf.unit);
				$("#sugar" + i).text(allRecipes[i].nutrients.sugar.quantity.toFixed(2) + " " + allRecipes[i].nutrients.sugar.unit);
				$("#protein" + i).text(allRecipes[i].nutrients.protein.quantity.toFixed(2) + " " + allRecipes[i].nutrients.protein.unit);
				$("#cholesterol" + i).text(allRecipes[i].nutrients.cholesterol.quantity.toFixed(2) + " " + allRecipes[i].nutrients.cholesterol.unit);
				$("#sodium" + i).text(allRecipes[i].nutrients.sodium.quantity.toFixed(2) + " " + allRecipes[i].nutrients.sodium.unit);
				$("#calcium" + i).text(allRecipes[i].nutrients.calcium.quantity.toFixed(2) + " " + allRecipes[i].nutrients.calcium.unit);
				$("#magnesium" + i).text(allRecipes[i].nutrients.magnesium.quantity.toFixed(2) + " " + allRecipes[i].nutrients.magnesium.unit);
				$("#potassium" + i).text(allRecipes[i].nutrients.potassium.quantity.toFixed(2) + " " + allRecipes[i].nutrients.potassium.unit);
				$("#iron" + i).text(allRecipes[i].nutrients.iron.quantity.toFixed(2) + " " + allRecipes[i].nutrients.iron.unit);
				$("#zinc" + i).text(allRecipes[i].nutrients.zinc.quantity.toFixed(2) + " " + allRecipes[i].nutrients.zinc.unit);
				$("#phosphorus" + i).text(allRecipes[i].nutrients.phosphorus.quantity.toFixed(2) + " " + allRecipes[i].nutrients.phosphorus.unit);
				$("#vitA" + i).text(allRecipes[i].nutrients.vitA.quantity.toFixed(2) + " " + allRecipes[i].nutrients.vitA.unit);
				$("#vitb6" + i).text(allRecipes[i].nutrients.vitb6.quantity.toFixed(2) + " " + allRecipes[i].nutrients.vitb6.unit);
				$("#vitD" + i).text(allRecipes[i].nutrients.vitD.quantity.toFixed(2) + " " + allRecipes[i].nutrients.vitD.unit);
				$("#vitE" + i).text(allRecipes[i].nutrients.vitE.quantity.toFixed(2) + " " + allRecipes[i].nutrients.vitE.unit);
				$("#vitK" + i).text(allRecipes[i].nutrients.vitK.quantity.toFixed(2) + " " + allRecipes[i].nutrients.vitK.unit);
			}
  		});
  	});
});

// $(document).ready(function() {
//     $.getJSON("", function(data) {
//      	console.log(data);
//     });
// });

// $(document).ready(function() {
//     $.getJSON("", function(data) {
//      	console.log(data);
//     });
// });