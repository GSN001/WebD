const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
let credentialsFile = process.argv[2];
let count = process.argv[3];
let subredName = process.argv[4];

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-notifications","--start-maximized"],
        slowMo: 50,
        defaultViewport:null
    });
    let page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });
    await login(page);
    let homePage = 'https://www.reddit.com/r/'+subredName;
    Promise.all([await page.goto(homePage), page.waitForNavigation({ waitUntil: "networkidle2" })]);
    await page.waitForSelector("._3JgI-GOrkmyIeDeyzXdyUD._2CSlKHjH7lsjx0IpjORx14", { visible: true });
    let postSel = await page.$$("._3JgI-GOrkmyIeDeyzXdyUD._2CSlKHjH7lsjx0IpjORx14 a");
    let i = 0;
    let j = 0;
    while (true) {

        if (i == count) {
            break;
        }
        let postURL = await page.evaluate((sel) => {
            return sel.getAttribute('href');
        }, postSel[i]);
        let postPage = await browser.newPage();
        await handlePost(postPage, postURL, i,browser);
        while (j <= (i / 8) * 3) {
            await page.keyboard.press('Space');
            j++;
            postSel = await page.$$("._3JgI-GOrkmyIeDeyzXdyUD._2CSlKHjH7lsjx0IpjORx14 a");
        }
        i++;
    }

    console.log("Job Done");


}

async function handlePost(postpage, link, i,browser) {
    await postpage.goto("https://www.reddit.com" + link);
    await postpage.waitForSelector(".icon.icon-upvote._2Jxk822qXs4DaXwsN7yyHA",{visible:true});
    postpage.waitFor(1000);
    let updootSel = await postpage.$(".icon.icon-upvote._2Jxk822qXs4DaXwsN7yyHA");
    await updootSel.click();
    let postName = await postpage.$('._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h h1');
    let postName1 = await postpage.evaluate(element => element.textContent, postName);
    console.log(i+1 + ":  " + postName1);
    await postpage.waitForSelector('._3Oa0THmZ3f5iZXAQ0hBJ0k a',{visible : true});
    let IMAGE_SELECTOR = await postpage.$('._3Oa0THmZ3f5iZXAQ0hBJ0k a');
    let imageHref = await postpage.evaluate((sel) => {
        return sel.getAttribute('href');
    }, IMAGE_SELECTOR);
    // console.log(imageHref);
    let newTab = await browser.newPage();

    await DownloadImage(newTab, imageHref, i,postName1);
    await postpage.close();
}

async function DownloadImage(page, imageHref, i,name) {
    var viewSource = await page.goto(imageHref);
    fs.writeFile(path.join("C:\\Users\\GSN\\Desktop\\TPP\\Automation\\Images", `redditImage___${i+1}__.jpg`), await viewSource.buffer(), function (err) {
        if (err) {
            // return console.log(err);
        }
    }
    );
    await page.close();
}

async function login(page) {
    let data = await fs.promises.readFile(credentialsFile);
    let { url, pwd, user } = JSON.parse(data);
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("#loginUsername", { visible: true });
    await page.type("#loginUsername", user);
    await page.type("#loginPassword", pwd);
    await Promise.all([page.click(".AnimatedForm__submitButton"), page.waitForNavigation({ waitUntil: "networkidle2" })])
}



main();
































// async function Test(page,link){
//     await page.goto("https://www.reddit.com" + link);
//     await page.waitFor(2000);
//     await page.close();
// }


