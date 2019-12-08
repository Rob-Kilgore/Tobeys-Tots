jQuery.ajaxSetup({async:false});

function showPopularMovies(){
  const $carousel=$("figure");

  $carousel.empty();
  let topMovies = new Array();

  $.get("/api/movie", function( data ){
    topMovies = data;
  });

  for(var i = 0; i < topMovies.length; i++){
    let path = "https://image.tmdb.org/t/p/w1280"+topMovies[i].poster_path;
    let movieId = topMovies[i].id;
    $carousel.append('<img src="'+path+'" id = "cposter1" alt="" class="'+movieId+'">');
  }

}

function showTopMoviesByCategory(){
  const $topActing = $("#topActing");
  const $topMusic = $("#topMusic");
  const $topStory = $("#topStory");

  $topActing.empty();
  $topMusic.empty();
  $topStory.empty();

  let acting = new Array();
  $.get("/api/movie/topMovies/6", function( data ){
    console.log("acting: "+data);
    acting = data;
  });


  let music = new Array();
  $.get("/api/movie/topMovies/0", function( data ){
    music = data;
      console.log("music: "+data);
  });

  let story = new Array();
  $.get("/api/movie/topMovies/5", function( data ){
    story = data;
      console.log("story: "+data);
  });
}

$(() => {
  showPopularMovies();
  showTopMoviesByCategory();
});
