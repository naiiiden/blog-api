import axios from "axios";
import { useState, useEffect } from "react";

interface Blog {
  body: string;
  comments: unknown[];
  createdAt: string;
  published: boolean;
  title: string;
  updatedAt: string;
  user: {
    _id: string;
    username: string;
  };
  _id: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
                <a href={blog.title}>{blog.title}</a>
                <p>{blog.createdAt}</p>
                <p>{blog.comments.length} comments</p>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default Blogs;
