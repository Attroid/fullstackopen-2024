import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import axios from "axios";
import LoginForm from "./components/LoginForm";

const App = () => {
  const notificationRef = useRef();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");

    if (!userJSON) {
      return;
    }

    setUser(JSON.parse(userJSON));
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
      notificationRef.current.showSuccess("Logged in succesfully");
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
