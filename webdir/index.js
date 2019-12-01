function showTopMovies(){
  const $firstitem=$("#firstItem");
  const $seconditem=$("#secondItem");
  const $thirditem=$("#thirdItem");
  const $fourthitem=$("#fourthItem");

  $firstitem.empty();
  $seconditem.empty();
  $thirditem.empty();
  $fourthitem.empty();

  $.get("/app", (movies) => {
     movies.forEach(function(movie) {

     });
  });
}

function getReccomendations(){

}

$(() => {
  showTopMovies();
  getReccomendations();
});
