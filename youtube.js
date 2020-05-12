const puppeteer = require('puppeteer')
const fs = require('fs')
let credentialsFile = process.argv[2];
try {
  (async () => {
    let browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-notifications","--start-maximised"],
        slowMo: 50,
        defaultViewport:null
    })
    let data = await fs.promises.readFile(credentialsFile);
    let { Name, URL } = JSON.parse(data);
    let page = await browser.newPage()
    await page.goto(URL[1]);
    for(let i=0;i<Name.length;i++){
    await page.type("input[id=search]", Name[i]);
    await page.click('button#search-icon-legacy')
    await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')
    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer')
    await videos[0].click();
    await page.waitForSelector('.html5-video-container')
    let link = await page.url();
    await DownnloadSong(browser,link,URL[0]);
    await page.goto(URL[1]);

    }
  })()
} catch (err) {
  console.error(err)
}

async function DownnloadSong(browser1,link,URL){
  const Downpage = await browser1.newPage();
    await Downpage._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: 'C:\\Users\\GSN\\Desktop\\TPP\\Automation\\Songs'
    });
    await Downpage.goto(URL);
    await Downpage.waitForSelector('input[id=input]');
    await Downpage.type('input[id=input]',link);
    await Downpage.click('input[id=submit]');
    await Downpage.waitForSelector('#buttons a')
    let but = await Downpage.$$('#buttons a')
    console.log(but.length);
    // let downHref = await Downpage.evaluate((sel) => {
    //     return sel.getAttribute('href');
    // }, but[0]);
    await but[0].click();
    await Downpage.waitFor(6000);
    await Downpage.close();

    
}
