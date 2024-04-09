import { useState } from "react";
import PropTypes from "prop-types";

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

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
          data-testId="blog-form-title"
          id="blog-form-title"
          type="text"
          value={blog.title}
          onChange={(ev) => setBlog({ ...blog, title: ev.target.value })}
        />
      </div>
      <div>
        author
        <input
          data-testId="blog-form-author"
          id="blog-form-author"
          type="text"
          value={blog.author}
          onChange={(ev) => setBlog({ ...blog, author: ev.target.value })}
        />
      </div>
      <div>
        url
        <input
          data-testId="blog-form-url"
          id="blog-form-url"
          type="text"
          value={blog.url}
          onChange={(ev) => setBlog({ ...blog, url: ev.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = propTypes;
BlogForm.displayName = "BlogForm";

export default BlogForm;
