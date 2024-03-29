var bodyParser          = require("body-parser");
var methodOverride      = require("method-override");
var expressSanitizer    = require("express-sanitizer"); 
var mongoose            = require("mongoose");
var express             = require("express");
var app                 = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title:  String,
    image:  {type: String, default: "https://pikwizard.com/photos/5c533c1c1fc92913385d8389cbf541f5-s.jpg"},
    body:   String,
    created:{type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

//INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs",function(req, res){
    Blog.find({}, function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs : blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new", function(req,res){
    res.render("new");
});
//CREATE ROUTE
app.post("/blogs", function(req,res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog : foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
           res.render("edit",{blog : foundBlog}); 
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BlogApp is running");
});