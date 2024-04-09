import { useState } from "react";
import PropTypes from "prop-types";

export const blogPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
});

const propTypes = {
  blog: blogPropType.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  hasAccess: PropTypes.bool,
};

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

Blog.propTypes = propTypes;
Blog.displayName = "Blog";

export default Blog;
