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
     OID:               { type: Number, required: true },
     title:             { type: String, required: true },
     year:              { type: Number, required: true },
     scores:            { type: Array },
     aggregateScore:    { type: Number },
     numReviews:        { type: Array, required: true }
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
                var average = 0;
                for(var i = 0; i < 10; i++)
                {
                    if(review.scores[i] >= 0)
                    {
                        movie.numReviews[i]++;
                        movie.scores[i] = ((movie.numReviews[i] - 1) * movie.scores[i] + review.scores[i]) / movie.numReviews[i];
                        //movie.scores[i] = 0;
                    }
                    average += movie.scores[i];
                }
                average /= 10;
                movie.aggregateScore = average;
                movie.markModified('numReviews');
                movie.markModified('scores');
                movie.markModified('aggregateScore');
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
    connect: function(dbUrl, callback)
    {
        mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
            if (err) {
                throw err;
            }
            else {
                 console.log("Connected successfully to database");
                 callback(1);
            }
        });
    },

    getConnectionState: function()
    {
        return mongoose.connection._readyState;
    },

    addUser: function(email, username, password, callback)
    {
        var user = new User({
            email: email,
            username: username,
            password: password
        });
        // wait for connection before doing stuff
            user.save(function (err, user) {
                if (err)
                    throw err;
                console.log("Added user to database");
                if(callback)
                {
                    callback(user);
                }
            });
    },

    addMovie: function(OID, callback)
    {
        var movie = new Movie({
            OID: OID,
            title: 'TBD',
            year: '2019',
            numReviews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        });
        // wait for connection before doing stuff
            movie.save(function (err, movie) {
                if (err)
                    throw err;
                console.log("Added movie to database");
                if(callback)
                {
                    callback(movie);
                }
            });
    },

    addReview: function(movieID, userID, scores, text, callback)
    {
        var review = new Review({
            movieID: ObjectId(movieID),
            userID: ObjectId(userID),
            scores: scores,
            text: text
        });
        // wait for connection before doing stuff
            review.save(function (err, review) {
                if (err)
                    throw err;
                console.log("Added review to database");
                updateMovieScore(review);
                if(callback)
                {
                    callback(review);
                }
            });
    },

    getOMDBObjectByID: function(APIKey, OID, callback)
    {
        request('https://api.themoviedb.org/3/movie/'+ OID + '?api_key=' + APIKey + '&language=en-US', {json: true }, (err, res, body) => {
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
            yearStr = '&year=' + year;
        }
        var requestStr = 'https://api.themoviedb.org/3/search/movie?api_key='
        + APIKey + '&language=en-US&query=' + title + '&page=1&include_adult=false' + yearStr;
        request(requestStr, {json: true }, (err, res, body) => {
            if(err) { throw err; }
            if(body.total_results == 0) {
                callback(-1);
                return;
            }

            if(body.success == false) {
                throw "Invalid Query";
            }
            callback(body.results[0]);
        });

    },

    getPopularMovies: function(APIKey, callback)
    {
        var requestStr = 'https://api.themoviedb.org/3/movie/popular?api_key='
        + APIKey + '&language=en-US&page=1';
        request(requestStr, {json: true }, (err, res, body) => {
            if(err) { throw err; }

            if(body.success == false) {
                throw "Invalid Query";
            }

            if(body.total_results < 8) {
                throw "Sorry, no movies here";
            }
            callback(body.results.slice(0, 8));
        });

    },

    getOrCreateMovie: function(title, year, APIKey, callback) {
        this.getOMDBObjectByTitle(APIKey, title, year, (body) => {
            if(body == -1) {
                callback(-1);
            }
            else {
                year = body.release_date.substring(0, 4);
                this.getMovieByTitle(body.original_title, year, (res) => {
                    if(res == -1) {
                        this.addMovie(body.id, body.original_title, year, (movie) => {
                            callback(movie);
                        });
                    }
                    else {
                        callback(res);
                    }
                });
            }
        });
    },

    getMovieByTitle: function(title, year, callback) {
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
    },

    getMovieByID: function(mID, callback) {
        var q = { "OID" : mID };
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
    },

    getTopReviews: function(category, callback) {
        var test = Movie.aggregate([
        {
            $project:
            {
                title: 1,
                OID: 1,
                aggregateScore: 1,
                value: { $arrayElemAt: [ "$scores", category] }
            }
        },
        {
            $sort:
            {
                value: -1,
                aggregateScore: -1
            }
        },
        {
            $limit: 5
        }
        ]).then(value => {
            if(callback) {
                // console.log(value);
                callback(value);
            }
        });
    },

    Hello: function()
    {
        console.log("hello");
    }
};
