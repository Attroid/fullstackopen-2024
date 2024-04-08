const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "661420945a84973aff0a8312",
      title: "The Mythical Man-Month",
      author: "Fred Brooks",
      url: "https://www.cs.drexel.edu/~yc349/CS451/RequiredReadings/MythicalManMonth.pdf",
      likes: 52,
      __v: 0,
    },
    {
      _id: "6614209a19aa9038cf1c7517",
      title: "No Silver Bullet - Essence and Accident in Software Engineering",
      author: "Edsger W. Dijkstra",
      url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
      likes: 33,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 90);
  });
});

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "661420945a84973aff0a8312",
      title: "The Mythical Man-Month",
      author: "Fred Brooks",
      url: "https://www.cs.drexel.edu/~yc349/CS451/RequiredReadings/MythicalManMonth.pdf",
      likes: 52,
      __v: 0,
    },
    {
      _id: "6614209a19aa9038cf1c7517",
      title: "No Silver Bullet - Essence and Accident in Software Engineering",
      author: "Edsger W. Dijkstra",
      url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
      likes: 33,
      __v: 0,
    },
  ];

  test("of empty list is undefined", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      title: listWithMultipleBlogs[1].title,
      author: listWithMultipleBlogs[1].author,
      likes: listWithMultipleBlogs[1].likes,
    });
  });
});

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "661420945a84973aff0a8312",
      title: "The Mythical Man-Month",
      author: "Fred Brooks",
      url: "https://www.cs.drexel.edu/~yc349/CS451/RequiredReadings/MythicalManMonth.pdf",
      likes: 52,
      __v: 0,
    },
    {
      _id: "6614209a19aa9038cf1c7517",
      title: "No Silver Bullet - Essence and Accident in Software Engineering",
      author: "Edsger W. Dijkstra",
      url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
      likes: 33,
      __v: 0,
    },
  ];

  test("of empty list is undefined", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, undefined);
  });

  test("when list has only one blog, equals the author of that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });
  });
});
