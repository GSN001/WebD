let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let seriesId = process.argv[2];
request("https://www.espncricinfo.com/scores/series/${seriesId}/", function (err, res, html) {
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
    let cardsHtml = $(".cscore.cscore--final.cricket.cscore--watchNotes");
    for(let i=0;i<cardsHtml.length;i++){
        let format = $(cardsHtml[i]).find(".cscore_info-overview").html();
        let ans = format.includes("T20I")||format.includes("ODI");
        if(ans){
            let url = $(cardsHtml[i]).find(".cscore_button.cscore_button--grouped button--gray button-alt sm.react-router-link a").attr("href");
            console.log(url);
        }
    }    
    // fs.writeFileSync("table1.html", tablehtml);
    // console.log(endComment);
}

