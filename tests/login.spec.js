const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const loginText = "\u30ed\u30b0\u30a4\u30f3";
const successSuffix = " \u3067\u30ed\u30b0\u30a4\u30f3\u60c5\u5831\u3092\u53d7\u3051\u53d6\u308a\u307e\u3057\u305f\u3002";
const emptyMessage = "ID \u3068 PASS \u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
const localLoginPage = pathToFileURL(path.resolve(__dirname, "../../login-site/index.html")).href;

test.describe("login-site login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.USE_LOCAL_SERVER === "1" ? localLoginPage : "/");
  });

  test("TC-001: page renders the login form", async ({ page }) => {
    await expect(page).toHaveTitle("Login Site");
    await expect(page.getByRole("heading", { name: loginText })).toBeVisible();
    await expect(page.getByLabel("ID")).toBeVisible();
    await expect(page.getByLabel("PASS")).toBeVisible();
    await expect(page.getByRole("button", { name: loginText })).toBeVisible();
  });

  test("TC-002: accepts valid-looking ID and PASS input", async ({ page }) => {
    await page.getByLabel("ID").fill("demo");
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toHaveText(`demo${successSuffix}`);
  });

  test("TC-003: ID field boundary accepts a one-character value", async ({ page }) => {
    await page.getByLabel("ID").fill("a");
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toHaveText(`a${successSuffix}`);
  });

  test("TC-004: browser validation prevents empty submit", async ({ page }) => {
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toBeEmpty();
    await expect(page.getByLabel("ID")).toBeFocused();
  });

  test("TC-005: password input masks typed text", async ({ page }) => {
    const password = page.getByLabel("PASS");

    await expect(password).toHaveAttribute("type", "password");
    await password.fill("secret");
    await expect(password).toHaveValue("secret");
  });

  test("TC-006: critical labels remain visible on mobile", async ({ page }) => {
    await expect(page.getByText("Local Web Project")).toBeVisible();
    await expect(page.getByText("ID", { exact: true })).toBeVisible();
    await expect(page.getByText("PASS", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: loginText })).toBeVisible();
  });

  test("TC-007: browser validation prevents submit with only ID", async ({ page }) => {
    await page.getByLabel("ID").fill("demo");
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toBeEmpty();
    await expect(page.getByLabel("PASS")).toBeFocused();
  });

  test("TC-008: browser validation prevents submit with only PASS", async ({ page }) => {
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toBeEmpty();
    await expect(page.getByLabel("ID")).toBeFocused();
  });

  test("TC-009: whitespace-only ID is rejected by app validation", async ({ page }) => {
    await page.getByLabel("ID").fill("   ");
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toHaveText(emptyMessage);
  });

  test("TC-010: long values can be submitted without breaking the form", async ({ page }) => {
    const longId = "user-" + "a".repeat(80);
    const longPass = "p".repeat(120);

    await page.getByLabel("ID").fill(longId);
    await page.getByLabel("PASS").fill(longPass);
    await page.getByRole("button", { name: loginText }).click();

    await expect(page.getByRole("status")).toHaveText(`${longId}${successSuffix}`);
    await expect(page.locator(".login-shell")).toBeVisible();
  });

  test("TC-011: keyboard operation submits valid credentials", async ({ page }) => {
    await page.keyboard.press("Tab");
    await page.keyboard.type("keyboard-user");
    await page.keyboard.press("Tab");
    await page.keyboard.type("password123");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("status")).toHaveText(`keyboard-user${successSuffix}`);
  });

  test("TC-012: core accessibility semantics are present", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("region", { name: loginText })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: loginText })).toBeVisible();
    await expect(page.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  test("TC-013: page visual layout matches the approved baseline", async ({ page }) => {
    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true
    });
  });
});
