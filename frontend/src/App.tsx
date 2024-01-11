import AllBlogs from "./pages/AllBlogs";
import Blog from "./pages/Blog";
import Header from "./components/Header";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NewBlog from "./pages/NewBlog";
import AdminBlogs from "./pages/AdminBlogs";
import { useEffect } from "react";
import { useUser } from "./UserContext";

const App = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, [setUser]);

  console.log('user from app ', user);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<h1>page not found</h1>} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/:blogName" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/all-blogs" element={<AdminBlogs />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
