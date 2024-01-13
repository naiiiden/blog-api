import axios from "axios";
import { useState, useEffect } from "react";
import { BlogType } from "../interfaces";
import BlogPreview from "../components/BlogPreview";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/")
    }
  }, [])

  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  console.log(blogs);

  return (
    <div>
      <h1>admin page for blogs to edit/publish or unpublish</h1>
      <p>All blogs will be rendered here:</p>
      <ul
        style={{
          padding: "0",
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {blogs.map((blog) => {
          return <BlogPreview blog={blog} key={blog._id} />;
        })}
      </ul>
    </div>
  );
};

export default AdminBlogs;
