import Blog from "./Blog";
import PropTypes from "prop-types";
import { blogPropType } from "./Blog";

const propTypes = {
  blogs: PropTypes.arrayOf(blogPropType).isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  checkAccessRights: PropTypes.func.isRequired,
};

const BlogList = (props) =>
  props.blogs
    .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        onLike={props.onLike}
        onRemove={props.onRemove}
        hasAccess={props.checkAccessRights(blog)}
      />
    ));

BlogList.propTypes = propTypes;
BlogList.displayName = "BlogList";

export default BlogList;
