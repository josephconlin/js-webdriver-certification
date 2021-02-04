/*
 * Challenge 3 - Loops:
 * For this challenge, go to copart and print a list of all the “Popular Items” of vehicle Make/Models on the home page
 * and the URL/href for each type.  This list can dynamically change depending on what is authored by the content
 * creator but using a loop will make sure that everything will be displayed regardless of the list size.
 *
 * Your output in the console would look like:
 * IMPREZA - https://www.copart.com/popular/model/impreza
 * CAMRY - https://www.copart.com/popular/model/camry
 * ELANTRA - https://www.copart.com/popular/model/elantra
 * ...
 */

var webdriver = require('selenium-webdriver');
const Home = require("../../pages/home.js");

describe("challenge3 suite", function(){
    this.timeout(20000);
    let driver, home;

    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        home = new Home(driver);
    });

    after(function () {
        return driver.quit();
    });

    it("I open the copart website", async function() {
        await home.navigateTo();
        await home.isDisplayed();
    });

    it("I click the 'Trending' sub tab", async function() {
        await home.displayTrendingTab();
    });

    it("I print out the trending makes with their URLs", async function() {
        await home.logTrendingWebElements();
    });

});
