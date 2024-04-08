const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("node:assert");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    title: "The Mythical Man-Month",
    author: "Fred Brooks",
    url: "https://www.cs.drexel.edu/~yc349/CS451/RequiredReadings/MythicalManMonth.pdf",
    likes: 37,
  },
  {
    title: "No Silver Bullet - Essence and Accident in Software Engineering",
    author: "Edsger W. Dijkstra",
    url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
    likes: 33,
  },
];

describe("blog api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (const blogToCreate of initialBlogs) {
      const blog = new Blog(blogToCreate);
      await blog.save();
    }
  });

  describe("GET /api/blogs", () => {
    test("should return blogs as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("should return all blogs", async () => {
      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, initialBlogs.length);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
