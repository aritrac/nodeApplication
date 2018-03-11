var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

var campgrounds = [
        {name: "Himalayan Routes Camp", image: "https://pixabay.com/get/eb30b00d21f0053ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "The Indus River Camp", image: "https://pixabay.com/get/eb3db30a29fd063ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "Tiger Camp Nubra", image: "https://pixabay.com/get/e833b3092cf5033ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "Himalayan Routes Camp", image: "https://pixabay.com/get/eb30b00d21f0053ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "The Indus River Camp", image: "https://pixabay.com/get/eb3db30a29fd063ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "Tiger Camp Nubra", image: "https://pixabay.com/get/e833b3092cf5033ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "Himalayan Routes Camp", image: "https://pixabay.com/get/eb30b00d21f0053ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "The Indus River Camp", image: "https://pixabay.com/get/eb3db30a29fd063ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"},
        {name: "Tiger Camp Nubra", image: "https://pixabay.com/get/e833b3092cf5033ed95c4518b7444795ea76e5d004b0144395f7c47ca6ebbc_340.jpg"}
    ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds : campgrounds});
});

app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name, image: image
    }
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});