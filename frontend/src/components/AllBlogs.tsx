import axios from "axios";
import { useState, useEffect } from "react";

interface Blog {
  body: string;
  comments: [
    {
      author: string;
      body: string;
      _id: string;
    }
  ];
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

const AllBlogs = () => {
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
                <a href={blog._id}>{blog.title}</a>
                <p>{blog.comments.length} comments</p>
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