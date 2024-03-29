//Contains CAMPGROUNDS routes
var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campground");
var middleware      = require("../middleware");

// ===========================
// CAMPGROUND ROUTES
// ===========================
router.get("/",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }else{
           res.render("campgrounds/index",{campgrounds : allCampgrounds});
       }
    });
});

//CREATE - add new campgrounds to database
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name, 
        image: image, 
        description: description,
        author: author
    };
    
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

//EDIT - EDIT CAMPGROUND ROUTE  
router.get("/:id/edit",middleware.checkCampGroundOwnership,function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        }
        res.render("campgrounds/edit", {campground:foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE  
router.put("/:id",middleware.checkCampGroundOwnership,function(req,res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    // redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE  
router.delete("/:id",middleware.checkCampGroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;