/*
 * Challenge 7 - More Arrays
 * For this challenge, take a look at SauceDemo.com logged in as standard_user. 
 * Create a 2 dimensional array that stores all the values displayed on the page along w/ the URL for that link.  
 * Once you have this array, you can verify all the elements in the array navigates to the correct page.
 */

var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
const SauceDemoLogin = require('../../pages/SauceDemoLogin.js');
const SauceDemoProducts = require('../../pages/saucedemoproducts.js');

describe("challenge7 suite", function(){
    this.timeout(20000);
    let driver, sauceDLogin, sauceDProducts;

    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        sauceDLogin = new SauceDemoLogin(driver);
        sauceDProducts = new SauceDemoProducts(driver);
    });

    after(function () {
        return driver.quit();
    });

    it("I open the saucedemo website", async function() {
        await sauceDLogin.navigateTo();
        await sauceDLogin.isDisplayed();
    });

    it("I login as 'standard_user'", async function() {
        await sauceDLogin.loginAs("standard_user");
    });

    it("I validate the products link to the correct page", async function() {
        const products = await sauceDProducts.getProductsAndURLs();
        for(let product of products) {
            await driver.get(product[1]);
            let text = await driver.findElement(webdriver.By.css("body")).getAttribute("innerHTML");
            assert.isTrue(text.includes(product[0]));
        }
    });

});
