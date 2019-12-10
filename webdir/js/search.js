jQuery.ajaxSetup({async:false});

function searchInput(e) {
	if(e.key === "Enter") {
    var searchBar = document.getElementById('searchBar');
    
    $.get("/api/movie/search/" + searchBar.value, function( data ){
      window.location.replace("/movie.html?id=" + data.OID);
      //res.redirect("./movie.html?id=" + data.OID);
    });
	}
}

$(() => {

  var searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('keypress', searchInput, true);
});
