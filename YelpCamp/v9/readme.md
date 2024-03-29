#Style the campgrounds page  
* Add a better header/title  
* Make campgrounds display in a grid  

#Style the Navbar and Form  
* Add a navbar to all templates  
* Style the new campground form  

#Add Mongoose  
* Install and configure mongoose  
* Setup campground model  
* Use campground model inside of our routes

#Show Page  
* Review the RESTful routes we've seen so far  
* Add description to our campground model  
* Show db.collection.drop()  
* Add a show route/template  

RESTFUL ROUTES  
name        url         verb            description  
=======================================================================  
INDEX       /dogs       GET             Display a list of all dogs  
NEW         /dogs/new   GET             Displays form to make a new dogs  
CREATE      /dogs       POST            Add new dog to DB  
SHOW        /dogs/:id   GET             Shows info about one dog

#Refactor Mongoose Code  
* Create a models directory  
* Use module.exports  
* Require everything correctly!  

#Add Seeds File  
* Add a seeds.js file  
* Run the seeds file every time the server starts  

#Add the Comment model!  
* Make our errors go away!  
* Display comments on campground show page  

#Comment New/Create  
* Discuss nested routes  
* Add the comment new and create routes  
* Add the new comment form  

RESTFUL ROUTES  

name        url                 verb        desc.
================================================================================  
INDEX       /dogs               GET         Display a list of all dogs  
NEW         /dogs/new           GET         Displays form to make a new dog  
CREATE      /dogs/:id           POST        Add new dog to DB  
SHOW        /dogs/:id           GET         Shows info about one dog  

NEW         /campgrounds/:id/comments/new       GET 
CREATE      /campgrounds/:id/comments           POST

#Style Show Page  
* Add sidebar to show page  
* Display comments nicely  

##Finish Styling Show Page  
* Add public directory  
* Add custom stylesheet  

##Auth Pt. 2 - Add User Model  
* Install all packages needed for auth  
* Define User model  

##Auth Pt. 2 - Register  
* Configure Passport  
* Add register routes  
* Add register template  

##Auth Pt. 3 - Login  
* Add login routes  
* Add login template  

##Auth Pt. 4 - Logout/Navbar  
* Add logout route  
* Prevent user from adding a comment if not signed in  
* Add links to navbar  
* Show/hide auth links correctly  

##Auth Pt. 5 - Show/Hide Links  
* Show/hide auth links in navbar correctly  

##Refactor The Routes  
* Use Express router to reorganize all routes  

##Users + Comments  
* Associate users and comments  
* Save author's name to a comment automatically  

##Users + Campgrounds  
* Prevent an unauthenticated user from creating a campground  
* Save username+id to new created campground  











