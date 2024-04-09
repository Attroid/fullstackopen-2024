import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const notificationRef = useRef();
  const blogFormRef = useRef();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      setBlogs(await blogService.getAll());
    })();
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");

    if (!userJSON) {
      return;
    }

    const user = JSON.parse(userJSON);
    setUser(user);
    blogService.setToken(user.token);
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      notificationRef.current.showSuccess("Logged in succesfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notificationRef.current.showError(error.response.data.error);
      } else {
        notificationRef.current.showError(error.message);
      }
    }
  };

  const handleBlogCreation = async (blog) => {
    try {
      await blogService.create(blog);
      setBlogs(await blogService.getAll());
      notificationRef.current.showSuccess(`a new blog ${blog.title} added`);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notificationRef.current.showError(error.response.data.error);
      } else {
        notificationRef.current.showError(error.message);
      }
    }
  };

  const handleBlogLike = async (blog) => {
    try {
      await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
      setBlogs(await blogService.getAll());
      notificationRef.current.showSuccess(
        `liked the blog ${blog.title} succesfully`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notificationRef.current.showError(error.response.data.error);
      } else {
        notificationRef.current.showError(error.message);
      }
    }
  };

  if (!user) {
    return (
      <div>
        <Notification ref={notificationRef} />
        <LoginForm onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification ref={notificationRef} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs
        .toSorted((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} onLike={handleBlogLike} />
        ))}

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onSubmit={handleBlogCreation} />
      </Togglable>
    </div>
  );
};

export default App;
