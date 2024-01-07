import AllBlogs from "./components/AllBlogs";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import NewBlog from "./components/NewBlog";

const App = () => {
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
        </Routes>
      </main>
    </>
  );
};

export default App;
