import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${blogId}`).then((res) => {
      setBlog(res.data);
    });
  }, []);

  console.log(blog);

  return (
    <main>
      <h1>{blog.title}</h1>
      <p>
        created:{" "}
        {new Date(blog.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p>{blog.body}</p>
      <p>{blog.comments.length} comments</p>
    </main>
  );
};

export default Blog;
