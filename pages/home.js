const {By, until} = require('selenium-webdriver');
const waitMillis = 5000;

class Home {
  constructor(driver) {
    this.driver = driver;
  };
    
  navigateTo = async function() {
    return await this.driver.get("https://www.copart.com/");
  };
      
  isDisplayed = async function() {
    return await this.driver.wait(
      until.titleIs("Salvage Cars for Sale | Online Car Auction - Copart USA Auto Auction"), 
      waitMillis, 
      "Home page does not appear to be loaded correctly"
    );
  };

  /* Trending sub tab */
  displayTrendingTab = async function() {
    const trendingLinkBy = By.css("a[href='#tabTrending']");
    const trendingLinkParentBy = By.xpath("./parent::li");
    const attrName = "class";
    const isDisplayedAttrValue = "active";

    const trendingLink = await this.driver.wait(until.elementLocated(trendingLinkBy));
    let trendingParent = await this.driver.wait(
      until.elementIsEnabled(this.driver.findElement(trendingLinkBy).findElement(trendingLinkParentBy)));
    let alreadyDisplayed = await trendingParent.getAttribute(attrName);
    if(!(alreadyDisplayed === isDisplayedAttrValue)) {
      return await trendingLink.click();
    }
  };
  
  logTrendingWebElements = async function() {
    const makesModelsDivBy = By.css("div[ng-if=popularSearches]");
    const div = await this.driver.wait(until.elementLocated(makesModelsDivBy));
    await this.driver.wait(until.elementIsVisible(div));
    const elements = await div.findElements(By.css("a"));
    for(let i in elements) {
      let name = await elements[i].getText();
      let link = await elements[i].getAttribute("href");
      console.log(name, " - ", link);
    }
  }
}
 
module.exports = Home;