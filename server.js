const express = require('express');
const assert = require('assert');
const dbInterface = require('./api/dbInterface');
const category = require('./api/categoryEnum');
const app = express();

const MongoClient = require('mongodb').MongoClient;
//var mongoose = require("mongoose");

const hostname = '127.0.0.1';
const port = 8080;


var pw, APIKey;
try {
     pw = extractArgument("pw", process.argv);
     APIKey = extractArgument("api", process.argv);
}
catch(err) {
     console.log("Error: " + err);
     process.exit(1);
}

const dbName = "MovieTimeDB";
const dbUrl = "mongodb+srv://326-admin:" + pw + "@movietime-kuraq.mongodb.net/" + dbName + "?retryWrites=true&w=majority";///" + dbName;

try
{
     dbInterface.connect(dbUrl);
     // console.log(APIKey);
     // console.log(dbInterface.getOMDBObjectByTitle(APIKey,'Spider-Man', 2002));
     /*console.log(dbInterface.getOMDBObjectByTitle(APIKey,'Spider-Man', null));
     console.log("ID:");*/
     /*dbInterface.getOMDBObjectByID(APIKey,'tt0145487', (body) => {
          console.log(body);
     });*/
     /*dbInterface.getOMDBObjectByTitle(APIKey,'Spider-Man', 20, (body) => {
          if(body.Response != 'False'){
          console.log(body);
          }
          else
          {
               console.log(body.Error);
          }
     });*/
     /*dbInterface.getMovieByID('5dcdca5377608c1110a2329a', (body) => {
          console.log(body);
     });*/
     /*dbInterface.getMovieByTitle('Spiderman', null, (body) => {
          console.log(body);
     });*/
}
catch(err) {
     console.log("Error: " + err);
     process.exit(1);
}
app.use(express.static("webdir"));

app.listen(8080);

//express routes (functions to be updated)

//homepage
app.get('/', function(req, res){
  res.json(dbInterface.getTopMovies())
})

//page for specific movie
app.get('/movies/:movieId', function(req, res){
  let movieId = req.params.movieId;
  let movie = dbInterface.getMovieByID();
  if(movie === -1){
    movie = dbInterface.getOMDBObjectById();
  }
  res.json(movie);
})

app.get('/search/:movieTitle', function(req, res){
  let movieTitle = req.params.movieTitle;
  let movie = dbInterface.getMovieByTitle();
  if(movie === -1){
    movie = dbInterface.getOMDBObjectByTitle();
  }
  res.json(movie);
})

app.post('/movies/:movieId/review', function(req, res){
  let movieId = req.params.movieId;
  let review = req.body;
  let userId = review.userId;
  let scores = review.scores;
  let text = review.text;
  dbInterface.addReview(movieId, userId, scores, text);
})

function extractArgument(arg, argv) {
     var value = null;
     argv.forEach(function(str)
     {
          if(str.substring(0, arg.length + 1) === arg + ":")
          {
               value = str.substring(arg.length + 1);
          }
     });
     if(value == null)
     {
          throw (arg + " argument not specified. Specify "+ arg + " using " + arg + ":[VALUE]");
     }
     return value;
}
