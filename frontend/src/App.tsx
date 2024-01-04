import AllBlogs from "./components/AllBlogs";
import Blog from "./components/Blog";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<h1>page not found</h1>} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/:blog" element={<Blog />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
