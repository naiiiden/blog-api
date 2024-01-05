import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <h1>
        <Link to="/">Nano's blog</Link>
      </h1>

      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
        }}
      >
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">password</label>
        <input type="passowrd" name="password" id="password" />
      </form>
    </header>
  );
};

export default Header;
