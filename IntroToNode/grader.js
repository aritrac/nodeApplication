function average(arr){
    var total = 0;
    //add all the scores together
    arr.forEach(function(ar){
        total += ar;    
    });
    //Divide and round to nearest integer and return
    return Math.round(total/arr.length);
}

var scores = [90,98,89,100,100,86,94];
console.log(average(scores)); //should return 94

var scores2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(scores2)); //should return 68