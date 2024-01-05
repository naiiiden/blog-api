import axios from "axios";
import { useState, useEffect } from "react";
import { BlogType } from "../interfaces";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blogs").then((res) => {
      setBlogs(res.data);
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
              <li
                key={blog._id}
                style={{
                  border: "1px solid red",
                  padding: "1rem",
                }}
              >
                <Link to={blog._id}>{blog.title}</Link>
                <p>{blog.comments?.length} comments</p>
                <p>
                  created:{" "}
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default AllBlogs;
