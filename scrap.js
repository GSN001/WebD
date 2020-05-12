let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
request("https://www.espncricinfo.com/series/19322/scorecard/1187679/",function(err,res,html){
    if(err==null && res.statusCode == 200){
        parsehtml(html);
    }else if(res.statusCode == 404){
        console.log("Page not found");
    }else{
        console.log(err);
    }
})

function parsehtml(html){
    let $ = cheerio.load(html);
    let tablehtml = $(".scorecard-section.bowling table tbody tr");
    let maxwickettaker="";
    let maxwicket =0;
    // let anchor = tablehtml.find("tbody tr")
    for(let i=0;i<tablehtml.length;i++){
        let bowler = $(tablehtml[i]).find("td a").html();
        let wickets = $($(tablehtml[i]).find("td")[5]).html();
        if(wickets>maxwicket){
            maxwickettaker = bowler;
            maxwicket = wickets;
        }
    }
    fs.writeFileSync("table.html",tablehtml);
    console.log(maxwickettaker + " "+ maxwicket);
}