import { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useNotificationHelper } from "../helpers";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const notifyAndReset = useNotificationHelper();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:3000/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log("logging in with ", username, password);
        console.log(1, res.data);

        setUser(res.data);
        window.localStorage.setItem("loggedBlogUser", JSON.stringify(res.data));
        setUsername("");
        setPassword("");
        navigate("/");
        notifyAndReset("login successful");
      })
      .catch((err) => {
        console.log(err);
        notifyAndReset("login unsuccessful");
      });
  };

  return (
    <>
      {user === null ? (
        <form className="flex flex-col p-4 mx-auto max-w-96 md:p-8" onSubmit={handleLogin}>
          <label className="pt-2 md:pt-4 pb-1 md:text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="border rounded p-2"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="pt-2 md:pt-4 pb-1 md:text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded p-2"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="rounded border my-2 md:my-4 py-2"
            type="submit"
            value="Login"
          />
        </form>
      ) : (
        <p>logged in as {user.username}</p>
      )}
    </>
  );
};

export default Login;
