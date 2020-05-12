require("chromedriver");
let fs = require("fs");
let swd = require("selenium-webdriver");
//"?? Dont question syntax
let credentialsFile = process.argv[2];
let metafile = process.argv[3];
let username,password;
//browser build
let bldr = new swd.Builder();
// tab
let driver = bldr.forBrowser("chrome").build();

let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise.then(function(credentials){
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password;
    let googlePageWillBeOpenedPromise = driver.get("https://pepcoding.com/login")
    return googlePageWillBeOpenedPromise;
}).then(function(){
    //search email
    let emailWillBeSelectedPromise =  driver.findElement(swd.By.css("input[type=email]"));
    return emailWillBeSelectedPromise;    
}).then(function(emailElement){
    let emailBeSendPromise = emailElement.sendKeys(username);
    return emailBeSendPromise;
}).then(function(){
    let passwordBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    return passwordBeSelectedPromise;
}).then(function(passwordElement){
    let passwordBeSendPromise = passwordElement.sendKeys(password);
    return passwordBeSendPromise;
}).then(function(){
    let signinBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return signinBeSelectedPromise;
}).then(function(signinElement){
    let passwordBeSendPromise = signinElement.click();
    return passwordBeSendPromise;
}).then(function () {
    // you should always wait 
    let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")));
    return willWaitForResourceToLoad;
  }).then(function(){
    let resourceanchorWillBeFetched = driver.findElement(swd.By.css(".resource a"));
    return resourceanchorWillBeFetched;
}).then(function (rAnchor){
    let rPageLinkProm    = rAnchor.getAttribute("href");
    return rPageLinkProm;
}).then(function (rPagelink){

    let coursePageList = driver.get(rPagelink);
    return coursePageList;
}).then(function (){
   let siteOverlay = driver.findElement(swd.By.css("#siteOverlay"));
   return siteOverlay;
}).then(function (soe){
    let waitforsoe = driver.wait(swd.until.elementIsNotVisible(soe),10000); 
    return waitforsoe;
}).then(function(){
    let coursewillBeLocatedprom = driver.findElement(swd.By.css("#courseCard33"));
    return coursewillBeLocatedprom;
}).then(function(courseCard){
    let courseCardselprom = courseCard.click();
    return courseCardselprom;
}).then(function () {
    let lisTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab .card.hoverable.module-details.no-margin.active")), 10000);
    lisTabToBeLocatedPromise
  }).
  then(function () {
    let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab .card.hoverable.module-details.no-margin.active"));
    return ModulesWillBeSelectedPromise;
  }).then(function (modules) {
    // *********************Module Selection
    gModules = modules
    console.log(modules.length);
    let moduleTextPromiseArr = [];
    for (let i = 0; i < modules.length; i++) {
      let moduleNamePromise = modules[i].getText();
      moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
    return AllModuleNamesPromise;
  }).then(function (AllModulesText) {
    let i;
    for (i = 0; i < AllModulesText.length; i++) {
      if (AllModulesText[i].includes("Dynamic Programming") == true) {
        break;
      }
    }
    let moduleWillBeclickedPromise = gModules[i].click();
    return moduleWillBeclickedPromise;
  }).then(function(){
    let lecSelWaitLocatedProm = driver.wait(swd.until.elementsLocated(swd.By.css(".collection-item.avatar.col.l6.s12 a")),10000);
    return lecSelWaitLocatedProm;
}).then(function(){
    let lecSelLocatedProm = driver.findElement(swd.By.css(".collection-item.avatar.col.l6.s12 a"));
    return lecSelLocatedProm;
}).then(function(lecSel){
    console.log(lecSel.length);
    let lecSelProm = lecSel.click();
    return lecSelProm;
})
.catch(function(err){
    console.log(err);
})