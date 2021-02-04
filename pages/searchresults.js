const {By, until} = require('selenium-webdriver');
const waitMillis = 5000;
const loopMillis = 500;

class SearchResults {
  constructor(driver) {
    this.driver = driver;
  };

  resultsTableIdBy = By.id("serverSideDataTable");

  waitForLoadingSpinner = async function() {
    let spinner = await this.driver.wait(until.elementLocated(By.id("serverSideDataTable_processing")), 2000);
    return await this.driver.wait(until.elementIsNotVisible(spinner));
  };

  isDisplayed = async function() {
    //Wait for the results table to be found
    await this.driver.wait(
        until.elementLocated(this.resultsTableIdBy),
        waitMillis,
        "Search results page was not loaded correctly"
    );

    //Allow the results table to finish populating
    let table = await this.driver.findElement(this.resultsTableIdBy).getAttribute("innerHTML");
    let endTime = new Date().getMilliseconds()+waitMillis;
    await this.driver.sleep(loopMillis);
    while(endTime > new Date().getMilliseconds() && 
        table != await this.driver.findElement(this.resultsTableIdBy).getAttribute("innerHTML")) {
          table = await this.driver.findElement(this.resultsTableIdBy).getAttribute("innerHTML");
          await this.driver.sleep(loopMillis);
    }

    //Return after making sure the loading spinner is gone
    return await this.driver.wait(
        until.elementIsVisible(this.driver.findElement(this.resultsTableIdBy)), 
        waitMillis, 
        "Search results page was not loaded correctly"
    );
  };

  getResultsText = async function() {
    await this.driver.wait(
        until.elementIsVisible(this.driver.findElement(this.resultsTableIdBy)),
        waitMillis,
        "Search results not found"
    );
    return await this.driver.findElement(this.resultsTableIdBy).getAttribute("innerHTML");
  };
  
  setShowEntriesTo = async function(value) {
    let select = await this.driver.wait(until.elementLocated(By.name("serverSideDataTable_length")));
    await select.click();
    await select.findElement(By.xpath("./option[@value='" + value + "']")).click();
    return await this.waitForLoadingSpinner();
  };
  
  logModelAndDamageCounts = async function() {
    const modelElements = await this.driver.findElement(this.resultsTableIdBy)
      .findElements(By.css("[data-uname=lotsearchLotmodel]")
    );
    const models = await Promise.all(modelElements.map(async model => model.getText()));
    models.sort();
    
    console.log("\nModel : Count");
    let firstModel = 0;
    for(let i = 0; i < models.length; i++) {
      if(models[firstModel] !== models[i]) {
        //i-firstModel is the count so print value and count, then move to next one by updating firstModel
        console.log(models[firstModel], " : ", i-firstModel);
        firstModel = i;
      }
    }

    const damageElements = await this.driver.findElement(this.resultsTableIdBy)
      .findElements(By.css("[data-uname=lotsearchLotdamagedescription]")
    );
    const damages = await Promise.all(damageElements.map(async model => model.getText()));
    
    const DAMAGE_REAR_END = "REAR END", DAMAGE_FRONT_END = "FRONT END", 
    DAMAGE_MINOR_DENT_SCRATCHES = "MINOR DENT/SCRATCHES", DAMAGE_UNDERCARRIAGE = "UNDERCARRIAGE", DAMAGE_MISC = "MISC";
    let rearEndCount = 0, frontEndCount = 0, minorDentScratchesCount = 0, undercarriageCount = 0, miscCount = 0;
    for(let damage of damages) {
      switch(damage) {
        case DAMAGE_REAR_END:
          rearEndCount++;
          break;
        case DAMAGE_FRONT_END:
          frontEndCount++;
          break;
        case DAMAGE_MINOR_DENT_SCRATCHES:
          minorDentScratchesCount++;
          break;
        case DAMAGE_UNDERCARRIAGE:
          undercarriageCount++;
          break;
        default:
          miscCount++;
          break;
      }
    }

    console.log("\nDamage : Count");
    console.log(DAMAGE_REAR_END, " : ", rearEndCount);
    console.log(DAMAGE_FRONT_END, " : ", frontEndCount);
    console.log(DAMAGE_MINOR_DENT_SCRATCHES, " : ", minorDentScratchesCount);
    console.log(DAMAGE_UNDERCARRIAGE, " : ", undercarriageCount);
    console.log(DAMAGE_MISC, " : ", miscCount);
  };
}
 
module.exports = SearchResults;