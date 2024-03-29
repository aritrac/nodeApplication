var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var app             = express();
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");
var seedDB          = require("./seeds");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var User            = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "ironman is awesome!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/",function(req,res){
    res.render("landing");
});

// ===========================
// CAMPGROUND ROUTES
// ===========================

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds",function(req,res){
    console.log(req.user);
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
    res.render("campgrounds/new.ejs");
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
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
});

// ================================
// COMMENT ROUTES
// ================================

// NEW ROUTE
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

// CREATE ROUTE
app.post("/campgrounds/:id/comments",isLoggedIn ,function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
});

// ===========
// AUTH ROUTES
// ===========

//show register form  
app.get("/register", function(req,res){
    res.render("register");
});

// handle sign up logic  
app.post("/register", function(req,res){
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local",
        {
            successRedirect: "/campgrounds", 
            failureRedirect: "/login"
            
        }),function(req, res){
            //Callback
        });
        
// logout route  
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});