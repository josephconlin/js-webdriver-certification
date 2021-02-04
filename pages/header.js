const {By, until} = require('selenium-webdriver');

class Header {
    constructor(driver) {
        this.driver = driver;
    }

    setSearchBoxTo = async function(searchTerm) {
        return await this.driver.findElement(By.id("input-search")).sendKeys(searchTerm);
    };

    clickSearchButton = async function() {
        return await this.driver.wait(until.elementIsEnabled(
            this.driver.findElement(By.xpath("//button[@data-uname='homepageHeadersearchsubmit']")))
        ).click();
    };
};
 
module.exports = Header;