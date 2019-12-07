const express = require('express');
const assert = require('assert');
const dbInterface = require('./api/dbInterface');
const category = require('./api/categoryEnum');
const app = express();
const bodyParser = require("body-parser");

const MongoClient = require('mongodb').MongoClient;
//var mongoose = require("mongoose");

const hostname = '127.0.0.1';
const port = 8080;

const router = express.Router();

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
     dbInterface.connect(dbUrl, (con) => {
          //console.log(dbInterface.getOMDBObjectByTitle(APIKey,'Spider-Man', 2002));
          /*console.log(dbInterface.getOMDBObjectByTitle(APIKey,'Spider-Man', null));
          console.log("ID:");*/
          /*dbInterface.getOMDBObjectByID(APIKey,'557', (body) => {
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
          //dbInterface.addUser("test@test.com", "testerman", "password123");
          /*dbInterface.getOrCreateMovie("Amazing Spider-Man", null, APIKey, (body) => {
               console.log(body);
          });*/
          /*dbInterface.getOrCreateMovie("Amazing Spider-Man", null, APIKey, (body) => {
               //console.log(body);
               if(body == -1)
               {
                    //dbInterface.addMovie(557, "Spider-Man", 2002);
               }
               else
               {
                    dbInterface.addReview(body._id, "5dcda19350adac312cc9b128", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], "awful");
               }
          });*/
          /*dbInterface.getTopReviews(category.ATMOSPHERE, (body) => {
               console.log(body);
          });*/
     });

}
catch(err) {
     console.log("Error: " + err);
     process.exit(1);
}



//express routes (functions to be updated)
router.use(bodyParser.json());

// This will use the static middleware
router.use(express.static('webdir'));

// Mount our API router to the main router with the `/api/songs` prefix.
router.use('/api/movie', require('./api/movie'));


app.use(router);
app.listen(8080);


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
