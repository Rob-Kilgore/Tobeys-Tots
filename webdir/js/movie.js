document.getElementsByClassName("search-bar").addEventListener("focus", function() {
    this.style.border = "1px solid #960018";
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
*/