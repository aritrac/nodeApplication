var express                 = require("express");
var mongoose                = require("mongoose");
var passport                = require("passport");
var bodyParser              = require("body-parser");
var LocalStrategy           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");
var expressSession          = require("express-session");
var User                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(expressSession({
    secret: "GTA-V is better than JustCause",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============
// ROUTES
// =============

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

// AUTH ROUTES
// Show Signup Form
app.get("/register", function(req,res){
    res.render("register");
});

//handling user sign up
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req,res){
    res.render("login");
});
// login logic
// middleware
app.post("/login",passport.authenticate("local", {
            successRedirect: "/secret",
            failureRedirect: "/login"
        }), function(req,res){
            
        });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up!");
});