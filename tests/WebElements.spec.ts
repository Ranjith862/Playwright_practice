import { expect, test } from "@playwright/test";

const url: string = "https://artoftesting.com/samplesiteforselenium";
const w3SchoolsUrl: string = "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_option_label";
const demoQAUrl: string = "https://demoqa.com/select-menu";
const alertUrl: string = "https://the-internet.herokuapp.com/javascript_alerts";

test("Radio Button", async ({ page }) => {
    await page.goto(url);
    const maleRadioButton = page.locator("//input[@id='male']");
    await maleRadioButton.check();
    await expect(maleRadioButton).toBeChecked();
});

test("Check Box", async ({ page }) => {
    await page.goto(url);
    const automationTesting = page.locator(".Automation");
    await automationTesting.check();
    await expect(automationTesting).toBeChecked();

    const performanceTesting = page.locator(".Performance");
    await performanceTesting.check();
    await expect(performanceTesting).toBeChecked();

    await performanceTesting.uncheck();
    await expect(performanceTesting).not.toBeChecked();

    if (await automationTesting.isChecked()) {
        console.log("Automation Testing is checked");
    } else {
        console.log("Automation Testing is not checked");
    }

    if (await performanceTesting.isChecked()) {
        console.log("Performance Testing is checked");
    } else {
        console.log("Performance Testing is not checked");
    }

});

test("Drop Down - select option by visible text", async ({ page }) => {
    await page.goto(url);
    const dropDown = page.locator("//select[@id='testingDropdown']");
    let selectedOption: string[] = await dropDown.selectOption("Performance Testing"); //By visible text
    console.log(selectedOption + "Option selected successfully");
});

test("Drop Down - select option by value", async ({ page }) => {
    await page.goto(url);
    const dropDown = page.locator("//select[@id='testingDropdown']");
    let selectedOption: string[] = await dropDown.selectOption({ value: "manual" }); //By value
    console.log(selectedOption + "Option selected successfully");
});

test("Drop Down - select option by index", async ({ page }) => {
    await page.goto(url);
    const dropDown = page.locator("//select[@id='testingDropdown']");
    let selectedOption: string[] = await dropDown.selectOption({ index: 3 }); //By index
    console.log(selectedOption + "Option selected successfully");
});

test("Drop Down - select option in the iframe", async ({ page }) => {
    await page.goto(w3SchoolsUrl);
    const iframe = page.frameLocator("#iframeResult");
    const dropDown = iframe.locator("//select[@id='cars']");
    let selectedOption: string[] = await dropDown.selectOption("Audi"); //By label
    console.log(selectedOption + "Option selected successfully");
});

test("Drop Down - select multiple options from Multiselect drop down with react", async ({ page }) => {
    await page.goto(demoQAUrl);

    const dropDown = page.locator("(//div[@class='css-1xc3v61-indicatorContainer'])[3]");
    const greenOption = page.locator("//div[text()='Green']");
    const blueOption = page.locator("//div[text()='Blue']");

    if (await dropDown.isVisible()) {
        console.log("Drop down is visible");

        await dropDown.click(); //Open the drop down
        await greenOption.click(); //Select Green option
        await blueOption.click(); //Select Blue option

    } else {
        console.log("Drop down is not visible");
    }
});

test("Drop Down - select multiple options", async ({ page }) => {
    await page.goto(demoQAUrl);
    const dropDown = page.locator("#cars");
    let selectedOptions: string[] = await dropDown.selectOption(['Volvo', 'Opel']); //Select multiple options
    console.log("Options selected successfully");
});

test("JavaScript Alert", async ({ page }) => {
    await page.goto(alertUrl);

    const alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    const resultText = page.locator("#result");

    page.on("dialog", async dialog => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    await alertButton.click();
    await expect(resultText).toHaveText("You successfully clicked an alert");

});

test("JavaScript Confirm", async ({ page }) => {
    await page.goto(alertUrl);

    const alertButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    const resultText = page.locator("#result");

    page.on("dialog", async dialog => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");

        console.log(`Dialog message: ${dialog.message()}`);

        await dialog.accept();
    });
    await alertButton.click();
    await expect(resultText).toHaveText("You clicked: Ok");
});

test("JavaScript Prompt", async ({ page }) => {
    await page.goto(alertUrl);

    const alertButton = page.getByRole('button', { name: 'Click for JS Prompt' });
    const resultText = page.locator("#result");
    const promptInput: string = "Test Prompt";

    page.on("dialog", async dialog => {
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");
        console.log(`Dialog message: ${dialog.message()}`);

        await dialog.accept(promptInput);
    });
    await alertButton.click();
    await expect(resultText).toHaveText("You entered: "+ promptInput);
});
