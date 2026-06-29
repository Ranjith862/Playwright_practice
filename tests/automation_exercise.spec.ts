import { test, Locator } from "@playwright/test";

test("Practice of getBy methods", async ({ page }) => {
    //Sign Up
    let url: string = "https://automationexercise.com/login";
    page.setViewportSize
    await page.goto(url);
    await page.waitForTimeout(5000);
    console.log("User successfully navigated to the login page");

    let usernameInput: Locator = page.getByPlaceholder("Name");
    await usernameInput.fill("Admin"); //Get loctor by label and fill the value
    console.log("User successfully entered email");

    let passwordInput: Locator = page.getByPlaceholder("Email Address").nth(1); //Get loctor by xpath
    await passwordInput.fill("admin123@mailinator.com"); //Get loctor by xpath and fill the value
    console.log("User successfully entered password");

    let signUpBtn: Locator = page.getByRole("button", { name: "Signup" });
    await signUpBtn.click(); //Get loctor by role and click the button    
    console.log("Sign Up successfully");

    await page.close();
});