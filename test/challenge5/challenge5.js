/*
 * Challenge 5 - If/Else/Switch
 * For this challenge, go to https://www.copart.com and do a search for “porsche” and change the  drop down for “Show
 * Entries” to 100 from 20.  Count how many different models of porsche is in the results on the first page and return
 * in the terminal how many of each type exists.
 *
 * Possible values can be “CAYENNE S”, “BOXSTER S”, etc.
 *
 * For the 2nd part of this challenge, create a switch statement to count the types of damages.
 * Here’s the types:
 * REAR END
 * FRONT END
 * MINOR DENT/SCRATCHES
 * UNDERCARRIAGE
 * And any other types can be grouped into one of MISC.
 */

var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
const Home = require("../../pages/home.js");
const Header = require("../../pages/header.js");
const SearchResults = require("../../pages/searchresults.js");

describe("challenge5 suite", function(){
    this.timeout(20000);
    let driver, home, header, searchResults;

    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        driver.manage().window().maximize();
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

    it("I search for 'porsche'", async function() {
        await header.setSearchBoxTo("porsche");
        await header.clickSearchButton();
        await searchResults.isDisplayed();
    });

    it("I set the number of results to 100", async function() {
        await searchResults.setShowEntriesTo(100);
    });

    it("I output the model and damage count", async function() {
        await searchResults.logModelAndDamageCounts();
    });

});

