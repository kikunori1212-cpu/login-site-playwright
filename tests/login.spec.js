const { test, expect } = require("@playwright/test");

test.describe("login-site login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("TC-001: page renders the login form", async ({ page }) => {
    await expect(page).toHaveTitle("Login Site");
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    await expect(page.getByLabel("ID")).toBeVisible();
    await expect(page.getByLabel("PASS")).toBeVisible();
    await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible();
  });

  test("TC-002: accepts valid-looking ID and PASS input", async ({ page }) => {
    await page.getByLabel("ID").fill("demo");
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByRole("status")).toHaveText("demo でログイン入力を受け付けました。");
  });

  test("TC-003: ID field boundary accepts a one-character value", async ({ page }) => {
    await page.getByLabel("ID").fill("a");
    await page.getByLabel("PASS").fill("password123");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByRole("status")).toHaveText("a でログイン入力を受け付けました。");
  });

  test("TC-004: browser validation prevents empty submit", async ({ page }) => {
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByRole("status")).toBeEmpty();
    await expect(page.getByLabel("ID")).toBeFocused();
  });

  test("TC-005: password input masks typed text", async ({ page }) => {
    const password = page.getByLabel("PASS");

    await expect(password).toHaveAttribute("type", "password");
    await password.fill("secret");
    await expect(password).toHaveValue("secret");
  });

  test("TC-006: critical Japanese labels remain visible on mobile", async ({ page }) => {
    await expect(page.getByText("Local Web Project")).toBeVisible();
    await expect(page.getByText("ID")).toBeVisible();
    await expect(page.getByText("PASS")).toBeVisible();
    await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible();
  });
});
