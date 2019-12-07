function showTopMovies(){
  const $carousel=$("figure");

  $carousel.empty();
  let topMovies = new Array();

  $.get("/api/movie", function( data ){
    console.log(data);
  });
     // movies.forEach(function(movie) {
     //  topMovies.push(movie);
     // });

  console.log("hello");

  $carousel.append(
    '<img src="images/sm1.jpg" id = "cposter1" alt=""><img src="images/sm1.jpg" id = "cposter2" alt=""><img src="images/sm1.jpg" id = "cposter3" alt=""><img src="images/sm2.jpg" id ="cposter4"  alt=""><img src="images/sm3.jpg" id = "cposter5" alt="">	<img src="images/sb.jpg" id = "cposter6" alt=""><img src="images/gg.jpg"  id = "cposter7" alt=""><img src="images/joker.jpg" id="cposter8" alt="">'
  );
}

function getReccomendations(){

}

$(() => {
  showTopMovies();
  getReccomendations();
});
