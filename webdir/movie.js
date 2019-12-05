//function to get info on movie
function getMovieInfo(movieId){
  $.get("/app/movies/"+movieId, movie=> {

  });
}

//function to post review of movie
function postReview(){
  $("#saveBtn").click(() => {
      //get all the fields filled routes
      $.ajax({
        type: "POST",
        url: "/server/movies/"+movieId+"/review",
        data: JSON.stringify(movie),
        contentType: "application/json"
    }).done((data) => {
        // Reset the form after saving the movie
        $("form").trigger("reset");
    }).fail((jqXHR) => {
        $("#error").html("The review could not be added.");
    });
  });
}

function getReviews(movieId){

}


//load functions on page laod
$(() => {
  getMovieInfo();
  postReview();
  getReviews();
});

/*  Movie page elements
    
    Attributes:
    <h2 id="movieTitle">Spider-Man 2</h2>
    <p class="attr" id="movieDetails">Action, Adventure | 2h 7m | 30 June 2004</p> <!-- Genre | Runtime | Release date -->
    <h4 id="movieDesc"> DESCRIPTION </h4>
    
    Categories:
    <h5 class="card-title" id="musicCat">Music: 9.5/10</h5>
    <h5 class="card-title" id="dialCat">Dialogue: 9.8/10</h5>
    <h5 class="card-title" id="storyCat">Story: 10/10</h5>
    <h5 class="card-title" id="editCat">Editing: 8.8/10</h5>
    <h5 class="card-title" id="origCat">Originality: 8.7/10</h5>
    <h5 class="card-title" id="visCat">Visual Effects: 10/10</h5>
    <h5 class="card-title" id="cineCat">Cinematography: 9/10</h5>
    <h5 class="card-title" id="actCat">Acting: 8.5/10</h5>
    <h5 class="card-title" id="atmCat">Atmosphere: 9.1/10</h5>
    <h5 class="card-title" id="impCat">Impact: 9.4/10</h5>

    Cast member card:
    <div class="col">
        <div class="card" style="width:250px; margin: 20px; background-color: beige;">
            <img class="card-img-top" src="FACE IMAGE" alt="Cast Image" id="castImg1">
            <div class="card-body">
                <h4 class="card-title" id="castName1"> NAME </h4>
            </div>
        </div>  
    </div>
    
    
    Index Elements:
    cposter1 - cposter8 = Carousel Poster Image Id's
    toppost1 - toppost4 = 4 Top Reccomendation's Poster Image Id's
    topname 1 - topname4 = 4 Top Reccomendation's Movie Names
    topbio1 - topbio4 = 4 Top Reccomendation's Movie Bios
    
*/
