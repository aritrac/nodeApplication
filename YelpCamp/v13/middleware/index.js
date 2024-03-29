// all the middleware goes here
var middlewareObj = {};
var Campground      = require("../models/campground");
var Comment      = require("../models/comment");

middlewareObj.checkCampGroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        //does the user own the campground?
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                console.log(err);
                req.flash('error', 'Sorry, that campground does not exist!');
                res.redirect("/campgrounds");
            }else{
                //does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        //does the user own the campground?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                console.log(err);
                req.flash('error', 'Sorry, that comment does not exist!');
                res.redirect("/campgrounds");
            }else{
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;