const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const blog = blogs.find((blog) => blog.likes === mostLikes);

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const blogsByAuthor = {};
  let authorWithMostBlogs;

  blogs.forEach((blog) => {
    if (Array.isArray(blogsByAuthor[blog.author])) {
      blogsByAuthor[blog.author].push(blog);
    } else {
      blogsByAuthor[blog.author] = [blog];
    }

    if (
      blogsByAuthor[blog.author].length >=
      (blogsByAuthor[authorWithMostBlogs] || []).length
    ) {
      authorWithMostBlogs = blog.author;
    }
  });

  return {
    author: authorWithMostBlogs,
    blogs: blogsByAuthor[authorWithMostBlogs].length,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const likesByAuthor = {};
  let authorWithMostLikes;

  blogs.forEach((blog) => {
    if (Number.isInteger(likesByAuthor[blog.author])) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }

    if (
      likesByAuthor[blog.author] >= (likesByAuthor[authorWithMostLikes] || 0)
    ) {
      authorWithMostLikes = blog.author;
    }
  });

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
