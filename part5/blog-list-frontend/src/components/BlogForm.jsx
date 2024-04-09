import { useState } from "react";

const BlogForm = (props) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onSubmit(blog);
      }}
    >
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          value={blog.title}
          onChange={(ev) => setBlog({ ...blog, title: ev.target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={blog.author}
          onChange={(ev) => setBlog({ ...blog, author: ev.target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={blog.url}
          onChange={(ev) => setBlog({ ...blog, url: ev.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
