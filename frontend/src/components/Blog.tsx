import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "../interfaces";

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogType>({
    body: "",
    comments: [
      {
        author: "",
        body: "",
        _id: "",
      },
    ],
    createdAt: "",
    published: false,
    title: "",
    updatedAt: "",
    user: {
      _id: "",
      username: "",
    },
    _id: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${blogId}`).then((res) => {
      setBlog(res.data);
    });
  }, [blogId]);

  console.log(blog);

  console.log("comments", blog.comments);

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
      <p>published by {blog.user.username}</p>
      <p>{blog.comments?.length} comments</p>
      <h2>comments:</h2>
      <ol>
        {blog.comments.map((comment) => {
            return (
                <li>
                    <div>
                        <p>{comment.author}</p>
                        <p>{comment.body}</p>
                    </div>
                </li>
            )
        })}
      </ol>
    </main>
  );
};

export default Blog;
