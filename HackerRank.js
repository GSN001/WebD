require("chromedriver");
let fs = require("fs");
let swd = require("selenium-webdriver");
let credentialsFile = process.argv[2];
let metafile = process.argv[3];
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

(async function (){

    try{
    await driver.manage().setTimeouts({implicit:10000,pageLoad:10000});
    let data = await fs.promises.readFile(credentialsFile);
    let {url, pwd, user} = JSON.parse(data);
    await driver.get(url);
    let emailField = driver.findElement(swd.By.css("#input-1"));
    let passField = driver.findElement(swd.By.css("#input-2"));
    let credSel = await Promise.all([emailField,passField]);
    let emailSend = credSel[0].sendKeys(user);
    let passSend = credSel[1].sendKeys(pwd);
    await Promise.all([emailSend,passSend]);
    let LoginBtn = await driver.findElement(swd.By.css(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"));
    await LoginBtn.click();
    let adminLink = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
    let adminURL = await adminLink.getAttribute("href");
    await driver.get(adminURL);
    let Tabs = await driver.findElements(swd.By.css(".administration header ul li"));
    await Tabs[1].click();



    }catch(err){
        console.log(err);
    }    
})()