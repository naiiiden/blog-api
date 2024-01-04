import Blogs from "./components/Blogs";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<h1>page not found</h1>}/>
          <Route path="/" element={<Blogs />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
