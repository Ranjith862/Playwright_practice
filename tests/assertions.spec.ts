import {test, expect} from "@playwright/test";

const url: string = "https://www.saucedemo.com/";

test("Assertion example", async ({ page }) => {
    await page.goto(url);
    const usernameInput = page.locator("#user-name");
    await usernameInput.fill("standard_user");
    const passwordInput = page.locator("#password");
    passwordInput.fill("secret_sauce");
    const loginButton = page.locator("#login-button");
    await loginButton.click();
    const productsTitle = page.locator(".title");
    await expect(productsTitle).toHaveText("Products");
});

test("Assertion example with expect - Auto retrying assertions", async ({ page }) => {
    await page.goto(url);
    const loginButton = page.locator("#login-button");
    
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).toHaveText("Login");
    await expect(loginButton).toHaveAttribute("id", "login-button");
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveId("login-button");
    await expect(loginButton).toHaveClass("submit-button btn_action");
    await expect(loginButton).toHaveCount(1);
    await expect(page).toHaveURL(url);
    await expect(page).toHaveTitle("Swag Labs");
    
});

test("Assertion example with expect - Non retrying assertions", async ({ page }) => {
    await page.goto(url);
    const loginButton = page.locator("#login-button");
    expect(await loginButton.isEnabled()).toBeTruthy();
    expect(await loginButton.textContent()).toBe("Login");
    expect(await loginButton.getAttribute("id")).toBe("login-button");
    expect(await loginButton.isVisible()).toBe(true);
    expect(await loginButton.getAttribute("id")).toBe("login-button");
    expect(await loginButton.getAttribute("class")).toBe("submit-button btn_action");
    expect(page.url()).toBe(url);
    expect(await page.title()).toBe("Swag Labs");
});

test("Assertion example with expect - Negative matchers", async ({ page }) => {
    await page.goto(url);
    const loginButton = page.locator("#login-button");
    expect(await loginButton.isEnabled()).not.toBe(false);
    expect(await loginButton.textContent()).not.toBe("Loginn");
    expect(await loginButton.getAttribute("id")).not.toBe("login-buttonn");
    expect(await loginButton.isVisible()).not.toBe(false);
    expect(await loginButton.getAttribute("id")).not.toBe("login-buttonn");
    expect(await loginButton.getAttribute("class")).not.toBe("submit-button btn_actionn");
    expect(page.url()).not.toBe("https://www.saucedemo.com/incorrect-url");
    expect(await page.title()).not.toBe("Swag Labs Incorrect Title");
});

test("Assertion example with expect - Custome expect message", async ({ page }) => {
    await page.goto(url);
    const loginButton = page.locator("#login-button");
    await expect(loginButton, "Login button should be enabled").toBeEnabled();
    await expect(loginButton, "Login button should have text 'Login'").toHaveText("Login");
    await expect(loginButton, "Login button should have attribute 'id' with value 'login-button'").toHaveAttribute("id", "login-button");
    await expect(loginButton, "Login button should be visible").toBeVisible();
    await expect(loginButton, "Login button should have id 'login-button'").toHaveId("login-button");
    await expect(loginButton, "Login button should have class 'submit-button btn_action'").toHaveClass("submit-button btn_action");
    await expect(page, "Page URL should be correct").toHaveURL(url);
    await expect(page, "Page title should be 'Swag Labs'").toHaveTitle("Swag Labs");
});

test("Assertion example with expect - Soft assertions", async ({ page }) => {
    await page.goto(url);
    const loginButton = page.locator("#login-button");
    await expect.soft(loginButton).toBeEnabled();
    await expect.soft(loginButton).toHaveText("Login");
    await expect.soft(loginButton).toHaveAttribute("id", "login-button");
    await expect.soft(loginButton).toBeVisible();
    await expect.soft(loginButton).toHaveId("login-button");
    await expect.soft(loginButton).toHaveClass("submit-button btn_action");
    await expect.soft(page).toHaveURL(url);
    await expect.soft(page).toHaveTitle("Swag Labs");
});

