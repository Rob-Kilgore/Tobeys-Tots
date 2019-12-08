jQuery.ajaxSetup({async:false});

function showTopMovies(){
  const $carousel=$("figure");

  $carousel.empty();
  let topMovies = new Array();

  $.get("/api/movie", function( data ){
    topMovies = data;
  });
     // movies.forEach(function(movie) {
     //  topMovies.push(movie);
     // });

  console.log(topMovies);

  for(var i = 0; i < topMovies.length; i++){
    let path = "https://image.tmdb.org/t/p/w1280"+topMovies[i].poster_path;
    let movieId = topMovies[i].id;
    $carousel.append('<img src="'+path+'" id = "cposter1" alt="" class="'+movieId+'">');
  }

  // $carousel.append(
  //   '<img src="images/sm1.jpg" id = "cposter1" alt=""><img src="images/sm1.jpg" id = "cposter2" alt=""><img src="images/sm1.jpg" id = "cposter3" alt=""><img src="images/sm2.jpg" id ="cposter4"  alt=""><img src="images/sm3.jpg" id = "cposter5" alt="">	<img src="images/sb.jpg" id = "cposter6" alt=""><img src="images/gg.jpg"  id = "cposter7" alt=""><img src="images/joker.jpg" id="cposter8" alt="">'
  // );
}

function getReccomendations(){

}

$(() => {
  showTopMovies();
  getReccomendations();
});
