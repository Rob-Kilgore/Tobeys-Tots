var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

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
            });
        });
    },

    Hello: function()
    {
        console.log("hello");
    }
};