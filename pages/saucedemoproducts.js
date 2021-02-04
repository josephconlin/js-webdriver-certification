const {By, until} = require('selenium-webdriver');
const waitMillis = 5000;

class SauceDemoProducts {
  constructor(driver) {
    this.driver = driver;
  };
    
  getProductsAndURLs = async function() {
    const inventoryListElement = await this.driver.wait(until.elementLocated(By.className("inventory_list")));
    await this.driver.wait(until.elementIsVisible(inventoryListElement));
    const inventoryElements = await this.driver.findElements(By.xpath("//div[@class='inventory_item_label']/a"));
    const productsArray = [];
    for(let element of inventoryElements) {
        let item = await element.getText();
        let url = await element.getAttribute('href');
        let arr = [item, url];
        productsArray.push(arr);
    }
    return productsArray;
  };
}
 
module.exports = SauceDemoProducts;