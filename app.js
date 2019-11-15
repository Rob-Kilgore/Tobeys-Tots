const express = require('express');
const assert = require('assert');
const dbInterface = require('./js/dbInterface');
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
     //console.log(APIKey);
     //console.log(dbInterface.getOMDBObject(APIKey,"tt0145487"));
     //dbInterface.addUser("test@test.com", "testerman", "password123");
     //dbInterface.addMovie("tt0145487", "Spider-Man", 2002);
     //dbInterface.addReview("5dcdca5377608c1110a23296","5dcda19350adac312cc9b128", [10, -1, -1, 1, -1, 10, 10, 5, 10, 10], "solid movie");
}
catch(err) {
     console.log(err);
     process.exit(1);
}

app.use(express.static("webdir"));

app.listen(8080);

//possible express routes (functions to be updated)

//homepage
app.get('/', function(req, res){
  res.send(dbInterface.Hello())
})

//page for specific movie
app.get('/movies/:movieId', function(req, res){
  let movieId = req.params.movieId;
  res.send("<h1>Page for movie: "+movieId+"</h1>")
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
