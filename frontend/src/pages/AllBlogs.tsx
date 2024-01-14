import axios from "axios";
import { useState, useEffect } from "react";
import { BlogType } from "../interfaces";
import BlogPreview from "../components/BlogPreview";
import { useUser } from "../UserContext";

const AllBlogs = () => {
  const { user } = useUser();
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
    <>
      <div className="p-4 mx-auto max-w-7xl md:p-8">
        <ul>
          {!user
            ? blogs.map((blog) => {
                return (
                  blog.published === true && (
                    <BlogPreview blog={blog} key={blog._id} />
                  )
                );
              })
            : blogs.map((blog) => {
                return <BlogPreview blog={blog} key={blog._id} />;
              })}
        </ul>
      </div>
    </>
  );
};

export default AllBlogs;
