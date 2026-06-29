import { expect, test } from "@playwright/test";

const googleUrl: string = "https://www.google.com/";
const url: string = "https://artoftesting.com/samplesiteforselenium";
const w3SchoolsUrl: string = "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_option_label";
const demoQAUrl: string = "https://demoqa.com/select-menu";
const alertUrl: string = "https://the-internet.herokuapp.com/javascript_alerts";
const iframeUrl1: string = "https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_form";
const iframeUrl2: string = "https://www.w3schools.com/html/html_iframe.asp";
const textBoxUrlW3S: string = "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit";
const buttonUrl: string = "https://the-internet.herokuapp.com/add_remove_elements/";
const automationExercise: string = "https://automationexercise.com/";
const droppable: string = "https://www.globalsqa.com/demo-site/draganddrop/";
const testPageUrl: string = "https://testpages.eviltester.com/pages/forms/html-form/";
const davidwashUrl: string = "https://davidwalsh.name/demo/multiple-file-upload.php";
const herokuAppForFileUpload: string = "https://the-internet.herokuapp.com/upload";

test.beforeAll("Browser Close", async ({ page }) => {
    console.log("Browser Opened");
})

test.afterAll("Browser Close", async ({ page }) => {
    await page.close();
    console.log("Browser Closed");
})

test("Text Box - locator fill method", async ({ page }) => {
    await page.goto(textBoxUrlW3S);
    const iFrame = page.frameLocator("#iframeResult");
    // await iFrame.locator("#fname").fill("Jack");
    // await iFrame.locator("#lname").fill("Leon");
    // await iFrame.locator("input[type=submit]").click();
    const firstName = iFrame.locator("#fname");
    const lastName = iFrame.locator("#lname");
    const submitBtn = iFrame.locator("input[type=submit]");

    await firstName.fill("Jack");
    await lastName.fill("Leon");
    await submitBtn.click();
    const expectedHeading = iFrame.locator("//h1[text()='Submitted Form Data']");

    await expect(expectedHeading).toHaveText("Submitted Form Data");
});

test("Text Box (Keyboard action) - locator pressSequentially and press method ", async ({ page }) => {
    await page.goto(googleUrl);
    const googleTextBox = page.locator("#APjFqb");
    //await googleTextBox.pressSequentially("Playwright automation");
    await googleTextBox.pressSequentially("Playwright", { delay: 500 });
    await googleTextBox.press("ArrowDown+ArrowDown", { delay: 500 });
    await googleTextBox.press("Enter", { delay: 500 });
});

test("Buttons - click and double click method", async ({ page }) => {
    await page.goto(buttonUrl);
    const addElementBtn = page.getByRole('button', { name: 'Add Element' });
    await addElementBtn.click(); //Normal Click
    await addElementBtn.dblclick(); //Double Click
});

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
    await expect(resultText).toHaveText("You entered: " + promptInput);
});

test("iFrame with name", async ({ page }) => {
    await page.goto(iframeUrl1);
    const iframe1 = page.frame("iframeResult");

    await iframe1?.locator("#fname").fill("Test First Name");
    await iframe1?.locator("#lname").fill("Test Last Name");
    await iframe1?.locator("input[type='submit']").click();

});

test("iFrame with URL", async ({ page }) => {
    await page.goto(iframeUrl2);
    const iframe2 = page.frame({ url: "https://www.w3schools.com/html/default.asp" });
    await iframe2?.getByRole('button', { name: 'Button to open search field' }).click();
    await iframe2?.getByPlaceholder("Search...").fill("HTML");
});

test("iFrame with frameLocator Method", async ({ page }) => {
    await page.goto(iframeUrl1);
    const iframe1 = page.frameLocator("#iframeResult");

    await iframe1.locator("#fname").fill("Test First Name");
    await iframe1.locator("#lname").fill("Test Last Name");
    await iframe1.locator("input[type='submit']").click();
});

test("Mouse Hover", async ({ page }) => {
    await page.goto(automationExercise);
    const cartLink = page.locator("//a[contains(text(),'Cart')]");
    await cartLink.hover();

});

test("Drag and Drop", async ({ page }) => {
    await page.goto(droppable);

    const iframe = page.frameLocator("(//iframe[@class='demo-frame'])[1]");

    const source = iframe.locator("//img[@alt='The peaks of High Tatras']");
    const target = iframe.locator("//div[@id='trash']");

    await source.dragTo(target);

    await expect(target).toHaveCount(1);
});

test("Keyboard actions", async ({ page }) => {
    await page.goto(testPageUrl);
    const username = page.locator("//input[@name='username']");
    const password = page.locator("//input[@name='password']");
    const comments = page.locator("//textarea[@name='comments']");

    await comments.scrollIntoViewIfNeeded();

    await comments.press("Control+A", { delay: 500 });
    await comments.press("Backspace", { delay: 500 });
    await comments.fill("Maddy Max");
    await comments.press("Control+A", { delay: 500 });
    await comments.press("Control+C", { delay: 500 });

    await username.press("Control+V", { delay: 500 });

    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageUp");
});

test("Single File Upload", async ({ page }) => {
    await page.goto(testPageUrl);
    const singleFileUpload = page.locator("//input[@name='filename']");
    await singleFileUpload.setInputFiles("Files/file_one.txt");
    console.log("Single File Is Uploaded Successfully!")
});

test("Multiple File Upload", async ({ page }) => {
    await page.goto(davidwashUrl);
    const multipleFileUpload = page.locator("//input[@name='filesToUpload']");
    await multipleFileUpload.setInputFiles(["Files/file_one.txt", "Files/file_two.txt"]);
    console.log("Multiple Files Are Uploaded Successfully!")

    await multipleFileUpload.setInputFiles([]);
    console.log("Successfully Removed The Files!");
});

test("File Upload for div tag", async ({ page }) => {
    await page.goto(herokuAppForFileUpload);
    const fileChooserPromise = page.waitForEvent("filechooser");
    const fileUploader = page.locator("//div[@id='drag-drop-upload']");
    await fileUploader.click();
    const fileChooserResolved = await fileChooserPromise;
    await fileChooserResolved.setFiles([
        "D:/Wallpaper/R_Shivan.jpg",
        "D:/Wallpaper/Shivan_Hd_phone_wallpaper.jpg",
        "D:/Wallpaper/Shivan_Image.jpg"
    ]);
    console.log("Files are Uploaded Successfully!");
})
