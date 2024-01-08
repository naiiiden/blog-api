import AllBlogs from "./components/AllBlogs";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import NewBlog from "./components/NewBlog";
import AdminBlogs from "./components/AdminBlogs";
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
          <Route path="/:blogId" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-blog" element={<NewBlog />} />
          <Route path="/all-blogs" element={<AdminBlogs />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
