var express = require("express");
var app = express();
var request = require("request");

app.get("/results",function(req,res){
    request('http://www.omdbapi.com/?s=star&apikey=thewdb', function(error, response, body){
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        res.send(parsedData["Search"][0]["Title"]);
    }
});
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie App has started!");
});