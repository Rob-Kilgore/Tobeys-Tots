var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email:          { type: String, required: true },
    fname:          { type: String, required: true },
    lname:          { type: String, required: true },
    password:       { type: String, required: true }
 });

 var User = mongoose.model("User", userSchema, "Users");

 var movieSchema = new mongoose.Schema({
     name:        { type: String, required: true },
     director:    { type: String, required: true }
  });
 
  var Movie = mongoose.model("Movie", movieSchema, "Movies");

  var reviewSchema = new mongoose.Schema({
      movie:   { type: String, required: true },
      user:    { type: String, required: true }
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
    
    addUser: function(id, name, director)
    {
        var user = new User({
            email: email,
            fname: fname,
            lname: lname,
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

    addMovie: function(name, director)
    {
        var movie = new Movie({
            name: name,
            director: director
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

    addReview: function(movie, user)
    {
        var review = new Review({
            movie: movie,
            user: user
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