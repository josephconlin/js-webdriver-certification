/* 
 *Step 10:
 *create a js file for your automation code in the folder.  ie: challenge1.js
 *
 * Step 11:
 * Let's create our function and basic setup and tear down structure in the js file.
 *
 * Step 16:
 * Let's write two test functions that checks to make sure the page title is what we expected by using the Chai Assert.
 *
 * Step 17:
 * To launch your automation test, save your test file, then run “mocha challenge1.js” in your terminal or command
 * prompt.
 *
 */

require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;

describe("challenge1 suite", function(){
   this.timeout(20000);
   var driver;
   before(function () {
       // initializing chrome driver
       driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
   });



   after(function () {
       return driver.quit();
   });

   it("I open the google website", function() {
       return driver.get("http://www.google.com");
   });

   it("The title is 'Google'", function() {
       // Since we want the title from the page, we need to manually handle the Promise
       return driver.getTitle().then(function(title) {
           assert.equal(title, "Google");
       });
   });


});
