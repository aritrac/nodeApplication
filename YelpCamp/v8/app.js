var express             = require("express");
var bodyParser          = require("body-parser");
var mongoose            = require("mongoose");
var app                 = express();
var Campground          = require("./models/campground");
var Comment             = require("./models/comment");
var seedDB              = require("./seeds");
var passport            = require("passport");
var LocalStrategy       = require("passport-local");
var User                = require("./models/user");

// REQUIRING ROUTES
var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgrounds");
var indexRoutes          = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//seedDB(); //seed the database

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

// EXPRESS ROUTER
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is up");
});