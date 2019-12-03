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
