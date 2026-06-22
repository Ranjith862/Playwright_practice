import { test } from "@playwright/test";
test("Practice of locator method", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator("//input[contains(@id,'user-name')]").fill("standard_user"); //Get loctor by xpath and fill the value
    console.log("User successfully entered username");
    await page.locator("input#password").fill("secret_sauce"); //Get loctor by css selector and fill the value
    console.log("User successfully entered password");
    await page.locator(".submit-button").click(); //Get loctor by css selector and click the button    
    console.log("Login successfully");

    await page.locator("text='Sauce Labs Backpack'").click(); //Get loctor by text and click the button    
    console.log("User successfully clicked on Sauce Labs Backpack");
    await page.locator("id=add-to-cart").click(); //Get loctor by id and click the button    
    console.log("User successfully clicked on Add to cart");
    //await page.locator("text='Remove'").click(); //Get loctor by text and click the button    
    //console.log("User successfully clicked on Remove");
});

test("Practice of getBy methods", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.getByLabel("Username").fill("standard_user"); //Get loctor by label and fill the value
    console.log("User successfully entered username");
    await page.getByLabel("Password").fill("secret_sauce"); //Get loctor by label and fill the value
    console.log("User successfully entered password");
    await page.getByRole("button", { name: "Login" }).click(); //Get loctor by role and click the button    
    console.log("Login successfully");
    await page.getByText("Sauce Labs Backpack").click(); //Get loctor by text and click the button
    console.log("User successfully clicked on Sauce Labs Backpack");

});