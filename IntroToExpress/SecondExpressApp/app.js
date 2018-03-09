var express = require("express");
var app = express();

var sounds = {
    "pig":"Oink",
    "cow":"Moo",
    "dog":"Woof Woof!"
}

app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal",function(req,res){
    var ani = req.params.animal.toLowerCase();
    res.send("The " + ani + " says '" + sounds[ani] + "'");
});

app.get("/repeat/:msg/:num",function(req,res){
    res.send(printer(req.params.msg,req.params.num));
});

app.get("*",function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT,process.env.IP,function(req,res){
    console.log("Server is up!");
});

function printer(str,n){
    var s = str;
    for(var i = 0; i < n - 1; i++){
        s += " " + str;
    }
    return s;
}