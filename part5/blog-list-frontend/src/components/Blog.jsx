import { useState } from "react";

const Blog = (props) => {
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
      {props.blog.title} {props.blog.author}
      {open && (
        <>
          <hr />
          <div>{props.blog.url}</div>
          <div>
            likes {props.blog.likes}{" "}
            <button onClick={() => props.onLike(props.blog)}>like</button>
          </div>
          <div>{props.blog.user.name}</div>
          {props.hasAccess && (
            <button onClick={() => props.onRemove(props.blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
