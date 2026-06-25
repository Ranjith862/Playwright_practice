import { test } from "@playwright/test";

test.describe.only("Practice of annotations", () => {
    test("Practice of annotations - 1", async ({ page }) => {
        console.log("Star test 1");
        console.log("End test 1");
    });

    test("Practice of annotations - 2", async ({ page }) => {
        console.log("Star test 2");
        console.log("End test 2");
    });

    test("Practice of annotations - 3", async ({ page }) => {
        console.log("Star test 3");
        console.log("End test 3");
    });
});
test.only("Practice of annotations - 4", async ({ page, browserName }) => {
    test.skip(browserName === "firefox", "This test is skipped on Firefox");
    console.log("Star test 4");
    console.log("End test 4");
});

test.skip("Practice of annotations - 5", async ({ page,  }) => {
    console.log("Star test 5");
    console.log("End test 5");
});

test.fixme("Practice of annotations - 6", async ({ page, browserName }) => {
    test.slow(browserName === "webkit", "This test is slow on WebKit");
    console.log("Star test 6");
    console.log("End test 6");
});

test("Practice of annotations - 7", async ({ page }) => {
    test.slow();
    console.log("Star test 7");
    console.log("End test 7");
});

test("Practice of annotations - 8", async ({ page }) => {
    test.setTimeout(50000);
    console.log("Star test 8");
    console.log("End test 8");
});

test("Practice of annotations - 9", async ({ page }) => {
    test.fail();
    console.log("Star test 9");
    console.log("End test 9");
});

test("Practice of annotations - 10", async ({ page, browserName }) => {
    test.fail(browserName === "firefox","This test is fail on firefox");
    console.log("Star test 10");
    console.log("End test 10");
});



