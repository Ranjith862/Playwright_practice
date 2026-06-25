import {chromium, test} from "@playwright/test";

test("Open google", async({page}) => {

     // const browser = await chromium.launch();
     // const context = await browser.newContext();
     // const page = await context.newPage();

     await page.goto("https://www.google.com");
     await page.getByLabel('Google apps').click();
     console.log("Open google");
});