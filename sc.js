let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
request("https://www.espncricinfo.com/series/19322/commentary/1187679/", function (err, res, html) {
    if (err == null && res.statusCode == 200) {
        parsehtml(html);
    } else if (res.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(err);
    }
})

function parsehtml(html) {
    let $ = cheerio.load(html);
    let tablehtml = $(".item-wrapper .description").html();    
    let endComment = tablehtml;

    
    fs.writeFileSync("table1.html", tablehtml);
    console.log(endComment);
}

