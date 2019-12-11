jQuery.ajaxSetup({async:false});

function searchInput(e) {
	if(e.key === "Enter") {
    var searchBar = document.getElementById('searchBar');
    
    $.get("/api/movie/search/" + searchBar.value, function( data ){
      if(data == -1) {
        window.alert("No movies found for search: " + searchBar.value);
      }
      else {
        window.location.replace("/movie.html?id=" + data.OID);
      }
      //res.redirect("./movie.html?id=" + data.OID);
    });
	}
}

$(() => {

  var searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('keypress', searchInput, true);
});
