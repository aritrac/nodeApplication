var express    = require("express");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var app        = express();
var Campground = require("./models/campground");
var seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

seedDB();

app.get("/",function(req,res){
    res.render("landing");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }else{
           res.render("index",{campgrounds : allCampgrounds});
       }
    });
});

//CREATE - add new campgrounds to database
app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {
        name: name, image: image, description: description
    };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err,campground){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground : foundCampground});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});