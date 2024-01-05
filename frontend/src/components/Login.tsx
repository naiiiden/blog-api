import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("logging in with ", username, password);
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
