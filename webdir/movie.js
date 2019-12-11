function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

let movieId=getQueryVariable('id');
let dbID='';

//function to get info on movie
function getMovieInfo(){
  const $poster=$("#moviePoster");
  const $desc=$("#movieDesc");
  const $details=$("#movieDetails");
  const $title=$("#movieTitle");

  $poster.empty();
  $desc.empty();
  $details.empty();
  $title.empty();

  //console.log('id: '+movieId);
  $.get("/api/movie/"+movieId, function( data ){
      // console.log(data);
      $poster.append('<img src="https://image.tmdb.org/t/p/w342'+data.poster_path+'" class="poster">')
      $desc.append(data.overview);
      $details.append(data.genres[0].name+' | '+data.runtime+ ' minutes | '+data.release_date);
      $title.append(data.title);
  });
}

function getReviews(movieId){
  const $music=$("#musicCat");
  const $vfx=$("#visCat");
  const $dialogue=$("#dialCat");
  const $cinemetogrophy=$("#cineCat");
  const $editing=$("#editCat");
  const $story=$("#storyCat");
  const $acting=$("#actCat");
  const $originality=$("#origCat");
  const $atmosphere=$("#atmCat");
  const $impact=$("#impCat");

  $music.empty();
  $vfx.empty();
  $dialogue.empty();
  $cinemetogrophy.empty();
  $editing.empty();
  $story.empty();
  $acting.empty();
  $originality.empty();
  $atmosphere.empty();
  $impact.empty();

  movieId=getQueryVariable('id');
  // console.log("id being passed: "+movieId);
  $.get("/api/movie/"+movieId+"/reviews", function( data ){
    if(data==-1)
    {
      window.alert("Could not find a movie with ID " + movieId);
    }
    // console.log("body: "+data.scores[0]);
    dbID=data._id;
    //console.log(dbID)
    var scoreStr = []
    for(var i = 0; i < 10; i++)
    {
      if(data.scores[i] != undefined) {
        scoreStr.push((Math.round(data.scores[i] * 100) / 100) + '/10');
      }
      else {
        scoreStr.push("N/A");
      }
    }
    if(data.scores){
      $music.append('<h5 class="card-title">Music: <br>'+scoreStr[0]+'</h5><p class="card-text rating">(From '+data.numReviews[0]+' ratings)</p>');
      $vfx.append('<h5 class="card-title">Visual Effects: <br>'+scoreStr[1]+'</h5><p class="card-text rating">(From '+data.numReviews[1]+' ratings)</p>');
      $dialogue.append('<h5 class="card-title">Dialogue: <br>'+scoreStr[2]+'</h5><p class="card-text rating">(From '+data.numReviews[2]+' ratings)</p>');
      $cinemetogrophy.append('<h5 class="card-title">Cinematography: <br>'+scoreStr[3]+'</h5><p class="card-text rating">(From '+data.numReviews[3]+' ratings)</p>');
      $editing.append('<h5 class="card-title">Editing: <br>'+scoreStr[4]+'</h5><p class="card-text rating">(From '+data.numReviews[4]+' ratings)</p>');
      $story.append('<h5 class="card-title">Story: <br>'+scoreStr[5]+'</h5><p class="card-text rating">(From '+data.numReviews[5]+' ratings)</p>');
      $acting.append('<h5 class="card-title">Acting: <br>'+scoreStr[6]+'</h5><p class="card-text rating">(From '+data.numReviews[6]+' ratings)</p>');
      $originality.append('<h5 class="card-title">Originality: <br>'+scoreStr[7]+'</h5><p class="card-text rating">(From '+data.numReviews[7]+' ratings)</p>');
      $atmosphere.append('<h5 class="card-title">Atmosphere: <br>'+scoreStr[8]+'</h5><p class="card-text rating">(From '+data.numReviews[8]+' ratings)</p>');
      $impact.append('<h5 class="card-title">Impact: <br>'+scoreStr[9]+'</h5><p class="card-text rating">(From '+data.numReviews[9]+' ratings)</p>');
    }
  });
}

// <!-- <h5 class="card-title">Music: 9.5/10</h5>
// <p class="card-text rating">(From 56 ratings)</p> -->

//function to post review of movie
function postReview(){
  const $reviewForm=$("#reviewForm");
  $reviewForm.submit(() => {
      console.log("form submitted");
      // console.log("form: "+$reviewForm.serializeArray());
      let review=$reviewForm.serializeArray();
      console.log(review);
      //get all the fields filled routes
      $.post( "/api/movie/"+dbID+"/postReview", review, "application/json");
    //   $.ajax({
    //     type: "POST",
    //     url: "/api/movie/"+movieId+"/postReview",
    //     data: review,
    //     contentType: "application/json"
    // }).done((data) => {
    //     // Reset the form after saving the movie
    //     $("#reviewForm").trigger("reset");
    // }).fail((jqXHR) => {
    //     $("#error").html("The review could not be added.");
    // });
    $reviewForm.trigger("reset");
    event.preventDefault();
  });
}




//load functions on page laod
$(() => {
  getMovieInfo();
  getReviews();
  postReview();
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

    Text Review Card:
    <div class="col">
        <div class="card" style="width:250px; margin: 20px; background-color: beige;">
            <div class="card-body">
              <h4 class="card-title" id="review1">Text Review</h4>
            </div>
        </div>
    </div>

    New Review Form:
      Rating categories input field:
      <input type="text" class="form-control form-rat" id="musicRev" placeholder="Music">
      Other IDs: dialRev, storyRev, editRev, origRev, visRev, cineRev, actingRev, atmRev, impRev

      Text Review input field:
      <textarea class="form-control" id="textReview" rows="4" style="height: 100px;"></textarea>

      Form error display:
      <h4 id="formError" style="color: red; text-align: center;"></h3>

      Review submit button ID: submitRev

    Index Elements:
    cposter1 - cposter8 = Carousel Poster Image Id's
    toppost1 - toppost4 = 4 Top Reccomendation's Poster Image Id's
    topname 1 - topname4 = 4 Top Reccomendation's Movie Names
    topbio1 - topbio4 = 4 Top Reccomendation's Movie Bios

*/
