import axios from "axios";
import { useState, useEffect } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  console.log(blogs);

  return (
    <div>
      <p>All published blogs will be rendered here:</p>
    </div>
  );
};

export default Blogs;
