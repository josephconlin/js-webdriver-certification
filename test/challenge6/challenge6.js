/*
 * Challenge 6 - Error Handling
 * For this challenge, go to copart site, search for nissan, and then for the model in the left side filter option,
 * search for “skyline”.  Now look for a check box for a Skyline.  This is a rare car that might or might not be in the
 * list for models.  When the link does not exist to click on, your script will throw an exception.  Catch the exception
 * and take a screenshot of the page of what it looks like.
 */

var webdriver = require('selenium-webdriver');
const fsp = require('fs').promises;
const Home = require("../../pages/home.js");
const Header = require("../../pages/header.js");
const SearchResults = require("../../pages/searchresults.js");
const SearchResultsFilter = require("../../pages/searchresultsfilter.js");

describe("challenge6 suite", function(){
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
        searchResultsFilter = new SearchResultsFilter(driver);
    });

    after(function () {
        return driver.quit();
    });

    it("I open the copart website", async function() {
        await home.navigateTo();
        await home.isDisplayed();
    });

    it("I search for 'nissan'", async function() {
        await header.setSearchBoxTo("nissan");
        await header.clickSearchButton();
        await searchResults.isDisplayed();
    });

    it("I filter for 'skyline'", async function() {
        await searchResultsFilter.expandModelFilter();
        try {
            await searchResultsFilter.setModelFilterTo("skyline");
        }
        catch(e) {
            console.log("An error was thrown.  See screenshot.");
        }
        finally {
            let image = await driver.takeScreenshot();
            await fsp.writeFile("./screenshot.png", image, 'base64');
        }
    });

});

