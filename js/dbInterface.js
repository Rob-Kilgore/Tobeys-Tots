const request = require("request");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var userSchema = new mongoose.Schema({
    email:          { type: String, required: true, unique: true },
    username:       { type: String, required: true, unique: true },
    password:       { type: String, required: true }
 });

 var User = mongoose.model("User", userSchema, "Users");

 var movieSchema = new mongoose.Schema({
     OID:        { type: String, required: true },
     title:      { type: String, required: true },
     year:       { type: Number, required: true },
     scores:     { type: Array },
     numReviews: { type: Array, required: true }
  });
 
  var Movie = mongoose.model("Movie", movieSchema, "Movies");

  var reviewSchema = new mongoose.Schema({
      movieID:   { type: ObjectId, required: true },
      userID:    { type: ObjectId, required: true },
      scores:    { type: Array, required: true },
      text:      { type: String }
   });
  
   var Review = mongoose.model("Review", reviewSchema, "Reviews");


   function updateMovieScore(review)
   {
       console.log("test");
        Movie.findById(review.movieID, function(err, movie) {
        if(err)
        {
            throw err;
        }   
        if(movie == null)
            {
                console.log("Movie not found");
            }
            else
            {
                if(movie.scores.length == 0)
                {
                    movie.scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
                for(var i = 0; i < 10; i++)
                {
                    if(review.scores[i] > 0)
                    {
                        movie.numReviews[i]++;
                        movie.scores[i] = ((movie.numReviews[i] - 1) * movie.scores[i] + review.scores[i]) / movie.numReviews[i];
                        //movie.scores[i] = 0;
                    }
                }
                
                movie.markModified('numReviews');
                movie.markModified('scores');
                movie.save(function (err, movie) {
                    if (err) 
                        throw err;
                    console.log("Updated movie scores");
                });
            }
        });
   }


    function getReviewsByMovie(mID, callback) {
        var q = { "movieID" : mID };
        
        Review.find(q, function(err, reviews) {

                callback(reviews);
            });
    }

module.exports = {
    connect: function(dbUrl)
    {
        mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
            if (err) {
                throw err;
            }
            else {
                 console.log("Connected successfully to database");
                 return true;
            }
        });
    },

    addUser: function(email, username, password)
    {
        var user = new User({
            email: email,
            username: username,
            password: password
        });
        // wait for connection before doing stuff
        mongoose.connection.once('open', function() { 
            
            user.save(function (err, user) {
                if (err) 
                    throw err;
                console.log("Added user to database");
            });
        });
    },

    addMovie: function(OID, title, year)
    {
        var movie = new Movie({
            OID: OID,
            title: title,
            year: year,
            numReviews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
        // wait for connection before doing stuff
        mongoose.connection.once('open', function() { 
            
            movie.save(function (err, movie) {
                if (err) 
                    throw err;
                console.log("Added movie to database");
            });
        });
    },

    addReview: function(movieID, userID, scores, text)
    {
        var review = new Review({
            movieID: ObjectId(movieID),
            userID: ObjectId(userID),
            scores: scores,
            text: text
        });
        // wait for connection before doing stuff
        mongoose.connection.once('open', function() { 
            
            review.save(function (err, review) {
                if (err) 
                    throw err;
                console.log("Added review to database");
                updateMovieScore(review);
            });
        });
    },

    getOMDBObjectByID: function(APIKey, OID, callback)
    {
        request('http://www.omdbapi.com/?apikey='+ APIKey + '&i=' + OID, {json: true }, (err, res, body) => {
            if(err) { throw err; }
            callback(body);
            //return body; // body is entire JSON object
        });
        //console.log(request('http://www.omdbapi.com/?apikey='+ APIKey + '&i=' + OID, {json: true }));

    },

    getOMDBObjectByTitle: function(APIKey, title, year, callback)
    {
        var yearStr = ''
        if(year!= null)
        {
            yearStr = '&y=' + year;
        }
        request('http://www.omdbapi.com/?apikey='+ APIKey + '&t=' + title + yearStr, {json: true }, (err, res, body) => {
            if(err) { throw err; }
            callback(body);
        });

    },

    getMovieByTitle: function(title, year, callback) {
        mongoose.connection.once('open', function() { 
            
            var q = { "title" : title, "year" : year };
            var mov;
            if(year==null)
            {
                q = { "title" : title };
            }
            
            Movie.find(q, function(err, movies) {
                if(err) {throw err; }
                if(movies.length == 0)
                {
                    callback(-1);
                    return;
                }
                mov = movies[0].toJSON();
                getReviewsByMovie(mov._id, function(reviews) {
                    mov["allReviews"] = reviews;
                    callback(mov);
                });
            });
        });
    },

    getMovieByID: function(mID, callback) {
        mongoose.connection.once('open', function() {   
            Movie.findById(ObjectId(mID), function(err, movie) {
                if(err) {throw err; }
                if(movie == null)
                {
                    callback(-1);
                    return;
                }
                mov = movie.toJSON();
                getReviewsByMovie(mov._id, function(reviews) {
                    mov["allReviews"] = reviews;
                    callback(mov);
                });
            });
        });
    },

    Hello: function()
    {
        console.log("hello");
    }
};