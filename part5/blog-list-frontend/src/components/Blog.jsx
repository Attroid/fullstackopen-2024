import { useState } from "react";

const Blog = ({ blog }) => {
  const [open, setOpen] = useState(false);

  const wrapperStyle = {
    border: "1px solid",
    padding: 16,
    margin: "8px 0",
    borderRadius: 5,
  };

  const toggleButtonStyle = {
    padding: "8px 16px",
    marginRight: 32,
  };

  return (
    <div style={wrapperStyle}>
      <button style={toggleButtonStyle} onClick={() => setOpen(!open)}>
        {open ? "hide" : "view"}
      </button>
      {blog.title} {blog.author}
      {open && (
        <>
          <hr />
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
