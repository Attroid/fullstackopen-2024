import { useState } from "react";

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <div>
      <h2>log in to application</h2>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          props.onSubmit(credentials);
        }}
      >
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
    </div>
  );
};

export default LoginForm;
