var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/",function(req,res){
    console.log("Someone made a request to /");
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
    console.log("Someone made a request to /bye");
    res.send("Goodbye!");
})
// "/do" => "MEOW!"
app.get("/dog",function(req,res){
    console.log("Someone made a request to /dog");
    res.send("Woof!");  
})
//Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});