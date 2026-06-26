import { test } from "@playwright/test";

const url: string = "https://www.saucedemo.com/";

test("Hooks practice test 1", async ({ page }) => {
    console.log("Start of test 1");
    await page.goto(url);
    const pageTitle: string = await page.title();
    console.log(`Page Title: ${pageTitle}`);
    console.log("End of test 1")
});

test("Hooks practice test 2", async ({ page }) => {
    console.log("Start of test 2");
    await page.goto(url);
    const pageTitle: string = await page.title();
    console.log(`Page Title: ${pageTitle}`);
    console.log("End of test 2");
});

test.afterEach("Practice of afterEach", async () => {
    console.log("Executing the after each block");
});

test.describe("Group One", () => {

    test("Hooks practice test 3", async ({ page }) => {
        console.log("Start of test 3");
        await page.goto(url);
        const pageTitle: string = await page.title();
        console.log(`Page Title: ${pageTitle}`);
        console.log("End of test 3");
    });

    test("Hooks practice test 4", async ({ page }) => {
        console.log("Start of test 4");
        await page.goto(url);
        const pageTitle: string = await page.title();
        console.log(`Page Title: ${pageTitle}`);
        console.log("End of test 4");
    });

    test.afterEach("Practice of afterEach inside Grop One", async () => {
        console.log("Executing the after each block in group one");
    });
});


