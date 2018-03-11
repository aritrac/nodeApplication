var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",function(err){
    if(err) 
        throw err;
    else
        console.log("Connected to MondoDB");
});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!");
//         console.log(err);
//     }else{
//         console.log("We just saved a cat to the DB");
//         console.log(cat);
//     }
//     mongoose.connection.close();
// });

// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Bland"
// },function(err, cat){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(cat);
//     }
// });

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cat){
    if(err){
        console.log("Oh no, Error!");
        console.log(err);
    }else{
        console.log("All the cats...");
        console.log(cat);
    }
});