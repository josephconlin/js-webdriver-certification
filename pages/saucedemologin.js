const {By, until} = require('selenium-webdriver');
const waitMillis = 5000;

class SauceDemoLogin {
  constructor(driver) {
    this.driver = driver;
  };
    
  navigateTo = async function() {
    return await this.driver.get("https://www.saucedemo.com/");
  };
      
  isDisplayed = async function() {
    return await this.driver.wait(until.titleIs("Swag Labs"), waitMillis, "Login page not loaded correctly");
  };

  setUsernameTo = async function(username) {
      const usernameElement = this.driver.wait(until.elementLocated(By.id("user-name")));
      return await this.driver.wait(until.elementIsVisible(usernameElement)).sendKeys(username);
  };

  setPasswordTo = async function(password = "secret_sauce") {
      const passwordElement = this.driver.wait(until.elementLocated(By.id("password")));
      return await this.driver.wait(until.elementIsVisible(passwordElement)).sendKeys(password);
  };

  clickLoginButton = async function() {
      const loginElement = this.driver.wait(until.elementLocated(By.id("login-button")));
      return await this.driver.wait(until.elementIsVisible(loginElement)).click();
  }

  loginAs = async function(username) {
      await this.setUsernameTo(username);
      await this.setPasswordTo();
      return await this.clickLoginButton();
  }
}
 
module.exports = SauceDemoLogin;