import { test } from "@playwright/test";

const url: string = "https://www.saucedemo.com/";

test.beforeAll("Practice of beforeAll", async () => {
    console.log("Executing the befor all block");
});

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

test.afterAll("Practice of afterAll", async () => {
    console.log("Executing the after all block");
});

test.describe("Group One", () => {

    test.beforeAll("Practice of beforeAll inside Grop One", async () => {
        console.log("Executing the befor all block in group one");
    });

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

    test.afterAll("Practice of afterAll inside Grop One", async () => {
        console.log("Executing the after all block in group one");
    });
});




