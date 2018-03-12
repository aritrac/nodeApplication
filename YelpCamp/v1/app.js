var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

var campgrounds = [
        {name: "Himalayan Routes Camp", image: "https://pikwizard.com/photos/600c3fc340cea0fb460038c9af2993d7-s.jpg"},
        {name: "The Indus River Camp", image: "https://pikwizard.com/photos/886ec82a538a0584410f482fd01f0ded-s.jpg"},
        {name: "Tiger Camp Nubra", image: "https://pikwizard.com/photos/022034b3aa8c00428cb7c5c27e7513a1-s.jpg"},
        {name: "Himalayan Routes Camp", image: "https://pikwizard.com/photos/4a807ee832c397b9b5dff1c2c76ec855-s.jpg"},
        {name: "The Indus River Camp", image: "https://pikwizard.com/photos/4cdc775f876fcaed40c73234745c6f05-s.jpg"},
        {name: "Himalayan Routes Camp", image: "https://pikwizard.com/photos/600c3fc340cea0fb460038c9af2993d7-s.jpg"},
        {name: "The Indus River Camp", image: "https://pikwizard.com/photos/886ec82a538a0584410f482fd01f0ded-s.jpg"},
        {name: "Tiger Camp Nubra", image: "https://pikwizard.com/photos/022034b3aa8c00428cb7c5c27e7513a1-s.jpg"},
        {name: "Himalayan Routes Camp", image: "https://pikwizard.com/photos/4a807ee832c397b9b5dff1c2c76ec855-s.jpg"},
        {name: "The Indus River Camp", image: "https://pikwizard.com/photos/4cdc775f876fcaed40c73234745c6f05-s.jpg"}
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