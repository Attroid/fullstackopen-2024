import { useState } from "react";

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onSubmit(credentials);
      }}
    >
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={credentials.username}
          onChange={(ev) =>
            setCredentials({ ...credentials, username: ev.target.value })
          }
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={credentials.password}
          onChange={(ev) =>
            setCredentials({ ...credentials, password: ev.target.value })
          }
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
