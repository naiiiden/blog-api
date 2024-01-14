import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  console.log(3, user);

  return (
    <header className="bg-blue-700">
      <div className="p-4 mx-auto flex justify-between items-center text-white max-w-7xl md:p-8">
        <h1 className="text-xl md:text-2xl">
          <Link to="/">Nano's blog</Link>
        </h1>

        {user === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="flex gap-2 md:gap-4">
            <Link to="/new-blog">Add a new blog</Link>
            <button
              onClick={() => (
                window.localStorage.removeItem("loggedBlogUser"),
                setUser(null),
                navigate("/")
              )}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
