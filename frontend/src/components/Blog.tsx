import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const { blog } = useParams();
  const [blogs, setBlogs] = useState<[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${blog}`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  console.log(blogs);

  console.log(blog);

  return <div>Blog</div>;
};

export default Blog;
