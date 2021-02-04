const {By, until} = require('selenium-webdriver');
const waitMillis = 5000;

class SearchResultsFilter {
  constructor(driver) {
    this.driver = driver;
  };

  //Model filter
  modelFilterBy = By.css("a[data-uname=ModelFilter]");

  expandModelFilter = async function() {
    const filterElement = await this.driver.wait(until.elementLocated(this.modelFilterBy));
    await this.driver.wait(until.elementIsVisible(filterElement));
    //Only click the filterLink if it's currently collapsed
    const expandedStatus = await filterElement.findElement(By.css("i")).getAttribute("class");
    if(expandedStatus.includes("fa-plus-square")) {
      return await filterElement.click();
    }
  };

  setModelFilterTo = async function(model) {
    const filterInput = await this.driver.wait(until.elementLocated(
      By.xpath("//a[@data-uname='ModelFilter']/ancestor::li//div//input[@type='text']")
      ));
    await this.driver.wait(until.elementIsVisible(filterInput));
    await filterInput.clear();
    await filterInput.sendKeys(model);
    const modelCheckbox = await this.driver.wait(until.elementLocated(By.id("lot_model_desc"+model.toUpperCase())));
    await this.driver.wait(until.elementIsVisible(modelCheckbox));
    return modelCheckbox.click();
  };
  
}

module.exports = SearchResultsFilter;