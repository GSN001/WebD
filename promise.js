let fs = require("fs");
console.log("before");
console.log("start");
let prom = fs.promises.readFile("f1.html");
prom.then(function (content){
    console.log(content +" ");
})
prom.catch(function (err){
    console.log(err);
})
console.log("After");