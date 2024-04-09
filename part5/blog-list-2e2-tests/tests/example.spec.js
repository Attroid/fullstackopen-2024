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
});
