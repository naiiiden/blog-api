import { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios
        .post(`http://localhost:3000/login`, {
          username,
          password,
        })
        .then((res) => {
          console.log("logging in with ", username, password);
          console.log(1, res.data);

          setUser(res.data);
          window.localStorage.setItem(
            "loggedBlogUser",
            JSON.stringify(res.data)
          );
          setUsername("");
          setPassword("");
        });
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      {user === null ? (
        <form
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
          }}
          onSubmit={handleLogin}
        >
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="passowrd"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" />
        </form>
      ) : (
        <p>logged in as {user.username}</p>
      )}
    </>
  );
};

export default Login;
