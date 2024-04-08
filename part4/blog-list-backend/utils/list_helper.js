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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
