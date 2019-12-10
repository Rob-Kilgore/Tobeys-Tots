const router = require("express").Router();
const dbInterface = require('./dbInterface');

// Add redirects to html files.
router.get('/', (req, res) => {
  dbInterface.getPopularMovies((body) => {
       // console.log(body);
       res.json(body);
  });
});

router.get('/topMovies/:category', (req, res) => {
  dbInterface.getTopReviews(parseInt(req.params.category), (body) => {
    // console.log(req.params.category+": "+body[0].title)
    res.json(body);
  });
});

//page for specific movie
router.get('/:movieId', function(req, res){
  let movieId = req.params.movieId;
  // console.log('id: '+movieId);
  //let movie = dbInterface.getMovieByID(movieId);
  //if(movie === -1){
    dbInterface.getOMDBObjectByID(movieId, (body) => {
      // console.log(body);
      let movie=body;
      // console.log(movie);
        res.json(movie);
    });
//  }
})

//reviews for a specific movies
router.get('/:movieId/reviews', function(req, res){
  let id = req.params.movieId;
  // console.log("id: "+id);
  dbInterface.getMovieByID(id, (body) => {
    // console.log(body);
    if(body===-1){
      dbInterface.getOMDBObjectByID(id, (movie) => {
        //console.log(movie);
        if(movie.status_code==34) {
          res.json(-1);
        }
        else {
          dbInterface.addMovie(id, movie.title, movie.release_date.substr(0, 4), (dbMovie) => {
            res.json(dbMovie);
          });
        }
      });
    }
    else res.json(body);
  })
})

router.get('/search/:movieTitle', function(req, res){
  let movieTitle = req.params.movieTitle;
  let year = null;
  // movie title includes a year
  if(/^.* \([0-9]{4}\)$/.test(movieTitle)) {
    year = parseInt(movieTitle.substr(movieTitle.length - 5, 4));
    movieTitle = movieTitle.substr(0, movieTitle.length - 7);
  }
  dbInterface.getOrCreateMovie(movieTitle, year, (body) => {
    res.json(body);
  });
  /*if(movie === -1){
    movie = dbInterface.getOMDBObjectByTitle();
  }*/
  //res.json(-1);
})

router.post('/:movieId/postReview', function(req, res){
  let movieId = req.params.movieId;
  // console.log(req.body.music);
  let review=[parseInt(req.body.music), parseInt(req.body.dialogue), parseInt(req.body.editing), parseInt(req.body.originality), parseInt(req.body.vfx), parseInt(req.body.cinemetogrophy), parseInt(req.body.acting), parseInt(req.body.atmosphere), parseInt(req.body.impact)];
  dbInterface.addReview(movieId, '5dcda19350adac312cc9b128', review, req.body.textReview);
  res.status(201).json(movieId);
})

module.exports = router;
