const router = require("express").Router();
const dbInterface = require('./dbInterface');

// Add redirects to html files.
router.get('/', (req, res) => {
  dbInterface.getPopularMovies('a05a8eaa14c959a0ea671b72e74db2a1', (body) => {
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
    dbInterface.getOMDBObjectByID('a05a8eaa14c959a0ea671b72e74db2a1', movieId, (body) => {
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
      dbInterface.addMovie(id, (body) => {
        res.json(body);
      })
    }
    else res.json(body);
  })
})

router.get('/search/:movieTitle', function(req, res){
  let movieTitle = req.params.movieTitle;
  let movie = dbInterface.getMovieByTitle();
  if(movie === -1){
    movie = dbInterface.getOMDBObjectByTitle();
  }
  res.json(movie);
})

router.post('/:movieId/postReview', function(req, res){
  let movieId = req.params.movieId;
  // console.log(req.body.music);
  let review=[parseInt(req.body.music), parseInt(req.body.dialogue), parseInt(req.body.editing), parseInt(req.body.originality), parseInt(req.body.vfx), parseInt(req.body.cinemetogrophy), parseInt(req.body.acting), parseInt(req.body.atmosphere), parseInt(req.body.impact)];
  dbInterface.addReview(movieId, '5dcda19350adac312cc9b128', review, req.body.textReview);
  res.status(201).json(movieId);
})

module.exports = router;
