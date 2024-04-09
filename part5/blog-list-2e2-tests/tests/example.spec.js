/*
Blog List End To End Testing, step1

Create a new npm project for tests and configure Playwright there.

Make a test to ensure that the application displays the login form by default.

The body of the test should be as follows

The beforeEach formatting blog must reset the database using for example the method we used in the material.
*/

const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog List app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    // Title
    await expect(page.getByText("log in to application")).toBeVisible();

    // Username input
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();

    // Password input
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();

    // Login button
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Logged in succesfully")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("iakkuulm");
      await page.getByTestId("password").fill("nenialas");
      await page.getByRole("button", { name: "login" }).click();

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      // Submit new blog
      await page.getByRole("button", { name: "new blog" }).click();

      await page.getByTestId("blog-form-title").fill("Ruoho on kasvanut");
      await page.getByTestId("blog-form-author").fill("Atte Koivukangas");
      await page.getByTestId("blog-form-url").fill("http://taakse.poistu");

      await page.getByRole("button", { name: "create" }).click();

      // Test that blog exists in view
      // + check that BlogForm is hidden to ensure that these checks don't
      // pass just because of filled inputs
      await expect(page.getByTestId("blog-form-title")).toHaveCount(0);
      await expect(page.getByTestId("blog-form-author")).toHaveCount(0);

      await expect(
        page.getByText("Ruoho on kasvanut", { exact: true })
      ).toBeVisible();
      await expect(page.getByText("Atte Koivukangas")).toBeVisible();
    });
  });
});
