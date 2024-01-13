import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  console.log(3, user);

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

      {user === null ? (
        <Link to="/login">login</Link>
      ) : (
        <button
          onClick={() => (
            window.localStorage.removeItem("loggedBlogUser"),
            setUser(null),
            navigate("/")
          )}
        >
          logout
        </button>
      )}
    </header>
  );
};

export default Header;
