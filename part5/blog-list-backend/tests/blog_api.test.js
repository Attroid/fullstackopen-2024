const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

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

const initialUsers = [
  {
    username: "User",
    password: "Qwerty123!",
  },
  {
    username: "Coordinator",
    password: "not_safe",
  },
];

describe("blog api", () => {
  let userToken;
  let coordinatorToken;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    for (const { password, ...restUserData } of initialUsers) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({ ...restUserData, passwordHash });
      await user.save();

      for (const blogToCreate of initialBlogs) {
        const blog = new Blog({ ...blogToCreate, user: user._id });
        await blog.save();
      }
    }

    const userLoginResponse = await api
      .post("/api/login")
      .send({ username: "User", password: "Qwerty123!" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const coordinatorLoginResponse = await api
      .post("/api/login")
      .send({ username: "Coordinator", password: "not_safe" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    userToken = userLoginResponse.body.token;
    coordinatorToken = coordinatorLoginResponse.body.token;
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

      assert.strictEqual(
        response.body.length,
        initialBlogs.length * initialUsers.length
      );
    });

    test("should include id field in every blog", async () => {
      const response = await api.get("/api/blogs");

      response.body.forEach((blog) => {
        assert.strictEqual(typeof blog.id, "string");
      });
    });

    test("shouldn't include _id field in a single blog", async () => {
      const response = await api.get("/api/blogs");

      response.body.forEach((blog) => {
        assert.strictEqual(typeof blog._id, "undefined");
      });
    });
  });

  describe("POST /api/blogs", () => {
    const blogToCreate = {
      author: "Daniel Martin",
      title: "11 of the most costly software errors in history",
      url: "https://raygun.com/blog/costly-software-errors-history/",
      likes: 7,
    };

    test("should fail with proper status code if authentication is not provided", async () => {
      await api.post("/api/blogs").send(blogToCreate).expect(401);
    });

    test("should create a new blog", async () => {
      const postResponse = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userToken}`)
        .send(blogToCreate)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(typeof postResponse.body, "object");
      assert.strictEqual(postResponse.body.author, blogToCreate.author);
      assert.strictEqual(postResponse.body.title, blogToCreate.title);
      assert.strictEqual(postResponse.body.url, blogToCreate.url);
      assert.strictEqual(postResponse.body.likes, blogToCreate.likes);

      const getResponse = await api.get("/api/blogs");

      assert.strictEqual(
        getResponse.body.length,
        initialBlogs.length * initialUsers.length + 1
      );

      const fetchedBlog = getResponse.body.find(
        (blog) => blog.author === blogToCreate.author
      );

      assert.strictEqual(typeof fetchedBlog, "object");
      assert.strictEqual(fetchedBlog.author, blogToCreate.author);
      assert.strictEqual(fetchedBlog.title, blogToCreate.title);
      assert.strictEqual(fetchedBlog.url, blogToCreate.url);
      assert.strictEqual(fetchedBlog.likes, blogToCreate.likes);
    });

    test("should default likes to zero", async () => {
      const { likes, ...rest } = blogToCreate;
      const postResponse = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userToken}`)
        .send(rest)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(postResponse.body.likes, 0);

      const getResponse = await api.get("/api/blogs");
      const fetchedBlog = getResponse.body.find(
        (blog) => blog.author === blogToCreate.author
      );

      assert.strictEqual(fetchedBlog.likes, 0);
    });

    test("should reject request with proper status code if title is missing", async () => {
      const { title, ...rest } = blogToCreate;
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userToken}`)
        .send(rest)
        .expect(400);
    });

    test("should reject request with proper status code if url is missing", async () => {
      const { url, ...rest } = blogToCreate;
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${userToken}`)
        .send(rest)
        .expect(400);
    });
  });

  describe("DELETE /api/blogs/:id", () => {
    test("should delete blog and respond with proper status code", async () => {
      const getResponseAtStart = await api.get("/api/blogs");

      const blogToDelete = getResponseAtStart.body[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(204);

      const getResponseAtEnd = await api.get("/api/blogs");

      assert.strictEqual(
        getResponseAtEnd.body.length,
        getResponseAtStart.body.length - 1
      );
      assert.strictEqual(
        typeof getResponseAtEnd.body.find(
          (blog) => blog.id === blogToDelete.id
        ),
        "undefined"
      );
    });
  });

  describe("PUT /api/blogs/:id", () => {
    test("should update blog and respond with proper status code", async () => {
      const getResponseAtStart = await api.get("/api/blogs");

      const blogToUpdate = getResponseAtStart.body[0];

      const dataForPut = {
        title: "Edited blog title",
        author: "Not me",
        likes: 123,
        url: "none",
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(dataForPut)
        .expect(200);

      const getResponseAtEnd = await api.get("/api/blogs");

      assert.strictEqual(
        getResponseAtEnd.body.length,
        getResponseAtStart.body.length
      );

      const blogFromResponseAtEnd = getResponseAtEnd.body.find(
        (blog) => blog.id === blogToUpdate.id
      );

      assert.strictEqual(blogFromResponseAtEnd.title, dataForPut.title);
      assert.strictEqual(blogFromResponseAtEnd.author, dataForPut.author);
      assert.strictEqual(blogFromResponseAtEnd.likes, dataForPut.likes);
      assert.strictEqual(blogFromResponseAtEnd.url, dataForPut.url);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
