import AllBlogs from "./pages/AllBlogs";
import Blog from "./pages/Blog";
import Header from "./components/Header";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NewBlog from "./pages/NewBlog";
import { useEffect } from "react";
import { useUser } from "./UserContext";
import Notification from "./components/Notification";
import { useNotification } from "./NotificationContext";

const App = () => {
  const { user, setUser } = useUser();
  const { notificationMessage } = useNotification();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, [setUser]);

  console.log("user from app ", user);

  return (
    <>
      <Notification notificationMessage={notificationMessage} />
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<h1>page not found</h1>} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/:blogName" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-blog" element={<NewBlog />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
