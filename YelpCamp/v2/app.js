var express    = require("express");
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var app        = express();


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "The Indus River Camp", 
//         image: "https://pikwizard.com/photos/886ec82a538a0584410f482fd01f0ded-s.jpg"
        
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

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }else{
           res.render("campgrounds",{campgrounds : allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name, image: image
    }
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

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});