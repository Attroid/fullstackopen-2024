const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const assert = require("node:assert");

const api = supertest(app);

describe("user api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/users", () => {
    test("should reject with proper status code when username is missing or too short", async () => {
      const response1 = await api
        .post("/api/users", { name: "Matti", password: "Qwerty123!" })
        .expect(400);

      assert.strictEqual(response1.body.error.includes("is required"), true);

      const response2 = await api
        .post("/api/users", {
          username: "Ma",
          name: "Matti",
          password: "Qwerty123!",
        })
        .expect(400);

      assert.strictEqual(
        response2.body.error.includes("at least 3 letters"),
        true
      );

      const response3 = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response3.body.length, 0);
    });

    test("should reject with proper status code when password is missing or too short", async () => {
      const response1 = await api
        .post("/api/users", { username: "Matti", name: "Matti" })
        .expect(400);

      assert.strictEqual(response1.body.error.includes("is required"), true);

      const response2 = await api
        .post("/api/users", {
          username: "Matti",
          name: "Matti",
          password: "Qw",
        })
        .expect(400);

      assert.strictEqual(
        response2.body.error.includes("at least 3 letters"),
        true
      );

      const response3 = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response3.body.length, 0);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
