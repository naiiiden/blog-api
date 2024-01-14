import axios from "axios";
import { useState, useEffect } from "react";
import { BlogType } from "../interfaces";
import BlogPreview from "../components/BlogPreview";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(blogs);

  return (
    <div>
      <p>All published blogs will be rendered here:</p>
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
          return (
            blog.published === true && (
              <BlogPreview blog={blog} key={blog._id} />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default AllBlogs;
