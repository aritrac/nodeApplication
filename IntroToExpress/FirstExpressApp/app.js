var express = require("express");
var app = express();
//for routing order, the first route gets selected, hence whatever route
//you provide will point to the * route which is not ideally the case
//route mapping will happen in top to bottom order
//app.get("*", function(req,res){
//    console.log("Someone made a request to an unknown route");
//    res.send("YOU ARE A STAR!");
//});

// "/" => "Hi there!"
app.get("/",function(req,res){
    console.log("Someone made a request to /");
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
    console.log("Someone made a request to /bye");
    res.send("Goodbye!");
});

// "/do" => "MEOW!"
app.get("/dog",function(req,res){
    console.log("Someone made a request to /dog");
    res.send("Woof!");  
});

// Route parameters demo
app.get("/r/:subredditName",function(req,res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " SUBREDDIT");
});

// Route parameters demo 2
app.get("/r/:subredditName/comments/:id/:title",function(req,res){
    console.log(req.params);
    res.send("Welcome to the comments page!"); 
});

// Catch All routes
app.get("*", function(req,res){
    console.log("Someone made a request to an unknown route");
    res.send("YOU ARE A STAR!");
});

//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});