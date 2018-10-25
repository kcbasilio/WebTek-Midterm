$(document).ready(function() {
	var domain = "https://api.edamam.com/search";
	var app_id = "40cae619";
	var app_key = "1b6db03230c404ca39f1ea74de1724fc";
	$("#submit-recipe").click( function() {
		var query = $("#recipe").val();
		$.getJSON(domain + "?q=" + query + "&app_id=" + app_id + "&app_key=" + app_key, function(data) {
			console.table(data);
			var counter = 1;
			$.each(data, function(index, value) {
				$.each(data.hits, function(index, value) {
					var label = value.recipe.label;
					var image = value.recipe.image;
					console.log(image);
					$("#recipe-title" + counter).text(label);
					$(".recipe-info-title" + counter).text(label);
					$("#result-subbox-image" + counter).attr("src", image);
					counter++;
				});
			});
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