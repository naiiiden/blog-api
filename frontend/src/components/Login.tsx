import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/login`, {
        username,
        password,
      });

      console.log("logging in with ", username, password);
      console.log(res.data);

      const user = res.data;
      console.log(1, user);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
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
  );
};

export default Login;
