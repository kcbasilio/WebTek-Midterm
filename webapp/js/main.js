// LIST NEW PHOTOS
// $(document).ready(function() {
//   $.getJSON("https://api.unsplash.com/photos/?client_id=9f775bdbac9e08ea9395a8b666b7e9e9d55826827f20cf119a6e8ce5ef1c7925", function(data) {
//     console.log(data);
//     var i = 0;
//     $.each(data, function(index, value) {
//       var user = value.user.username;
//       var likes = value.likes;
//       var photo = value.urls.regular;
//       // console.log(".title." + i);
//       $(".name." + i).text(user);
//       $(".image." + i).attr("src", photo);
//       // $(".title." + i).text(likes);
//       i++;
//     });
//   });
// });

// LIST COLLECTIONS 
// $(document).ready(function() {
//     $.getJSON("https://api.unsplash.com/collections/featured?client_id=9f775bdbac9e08ea9395a8b666b7e9e9d55826827f20cf119a6e8ce5ef1c7925", function(data) {
//       console.log(data);
//     });
// });

// // SEARCH PHOTO BY KEYWORD
// $(document).ready(function() {
//     $.getJSON("https://api.unsplash.com/search/photos/?page=2&query=forest&client_id=9f775bdbac9e08ea9395a8b666b7e9e9d55826827f20cf119a6e8ce5ef1c7925", function(data) {
//       console.log(data);
//     });
// });