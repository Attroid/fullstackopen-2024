import Blog from "./Blog";

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

export default BlogList;
