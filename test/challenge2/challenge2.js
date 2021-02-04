/*
 * Challenge 2 - Asserts:
 * For this challenge, look through the different ways to do assertions.  Then write a script that will go to
 * copart.com, search for exotics and verify porsche is in the list of cars.  Use the hard assertion for this challenge.
 */

var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
const Home = require("../../pages/home.js");
const Header = require("../../pages/header.js");
const SearchResults = require("../../pages/searchresults.js");

describe("challenge2 suite", function(){
    this.timeout(20000);
    let driver, home, header, searchResults;

    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        home = new Home(driver);
        header = new Header(driver);
        searchResults = new SearchResults(driver);
    });

    after(function () {
        return driver.quit();
    });

    it("I open the copart website", async function() {
        await home.navigateTo();
        await home.isDisplayed();
    });

    it("I search for 'exotics'", async function() {
        await header.setSearchBoxTo("exotics");
        await header.clickSearchButton();
        await searchResults.isDisplayed();
    });

    it("Search results contain 'PORSCHE'", async function() {
        assert.include(await searchResults.getResultsText(), "PORSCHE");
    });

});
