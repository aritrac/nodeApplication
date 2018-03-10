var express = require("express");
var app = express();

/*serving the CSS file which is in this folder*/
app.use(express.static('public'));

/*We dont have to supply view file extensions to be ejs anymore after this*/
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing});
});

app.get("/posts",function(req,res){
   var posts = [
      {title: "New GTA launched!", author: "Tatha"},
      {title: "My adorable pet bunny", author: "Charlie"},
      {title: "Can you believe this pomsky?", author: "Aritra"}
   ];
   
   res.render("posts", {posts: posts});
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server is up!!"); 
});