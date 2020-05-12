const puppeteer = require('puppeteer');
let fs = require("fs");
let credentialsFile = process.argv[2];
let metafile = process.argv[3];

(async () => {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--incognito"]

    });
    let data = await fs.promises.readFile(credentialsFile);
    let {url, pwd, user} = JSON.parse(data);
    let page = await browser.newPage();
    await page.goto(url,{waitUntil:"networkidle0"});
    await page.type("#input-1",user);
    await page.type("#input-2",pwd);
    await page.click("button[data-analytics=LoginPassword]");
    
    await page.waitForNavigation({waitUntil:"networkidle0"});
    await page.waitForSelector("a[data-analytics=NavBarProfileDropDown]")
    await page.click("a[data-analytics=NavBarProfileDropDown]");
    await page.click("a[data-analytics=NavBarProfileDropDownAdministration]");
    await page.waitFor(2000);
    await page.waitForSelector(".administration header ul li ")
    let tabs = await page.$$(".administration header ul li a");
    await tabs[1].click();
    await page.waitFor(2000);
    let mpUrl = await page.url();
    console.log(mpUrl);
    await navigateQuestions(mpUrl,page);
  })();

async function navigateQuestions(URL,page){
    while (true) {
        await page.goto(URL);
        
        let nextBTNS = await page.$$("#content > div > div > div > section > div.pagination-wrap.clearfix.pagination-wrapper > div.pagination");
        let nxtBtn = nextBTNS[nextBTNS.length - 2];
        console.log(nextBTNS.length);
        // let status = await nextBTNS.attribute("class");
        let status = await nxtBtn.$('class');
        await page.waitFor(1500);
       
        
        console.log(status);
        if (status == "disabled") {
            await console.log("Indise IF");
            // await HandleQuestionPage(URL);
            break;
        } else {
            await console.log("Inside Else");
            // await HandleQuestionPage(URL);
            await page.goto(URL);
            nextBTNS = await page.$$(".pagination ul li");
            nxtBtn = nextBTNS[nextBTNS.length - 2];
            await nxtBtn.click();
            URL = await page.url();
        }
    }
}
// #content > div > div > div > section > div.pagination-wrap.clearfix.pagination-wrapper > div.pagination