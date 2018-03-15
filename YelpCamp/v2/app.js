var express    = require("express");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var app        = express();


mongoose.connect("mongodb://localhost/yelp_camp_v2");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "The Indus River Camp", 
//         image: "https://pikwizard.com/photos/886ec82a538a0584410f482fd01f0ded-s.jpg",
//         description: "This is situated on the picturesque location of Punjab with mother nature at its best. A sight to behold!"
        
//     },function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     });

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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("show", {campground : foundCampground});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});