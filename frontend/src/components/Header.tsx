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

      <Link to="/login">login</Link>
    </header>
  );
};

export default Header;
