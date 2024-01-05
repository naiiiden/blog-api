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
      <p>published by {blog.user.username}</p>
      <p>{blog.body}</p>
      <h2>comments ({blog.comments?.length}) </h2>
      {Number(blog.comments?.length) === 0 ? (
        <p>be the first to drop a comment</p>
      ) : (
        <ol>
          {blog.comments.map((comment) => {
            return (
              <li key={comment._id}>
                <div>
                  <p>{comment.author}</p>
                  <p>{comment.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {/* todo */}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        action={`http://localhost:3000/blogs/${blogId}/comments`}
        method="POST"
      >
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="name or post anonymously"
        />
        <label htmlFor="body">message:</label>
        <textarea
          name="body"
          id="body"
          cols={50}
          rows={10}
          placeholder="write your comment here"
        ></textarea>
        <input type="submit" value="submit" />
      </form>
    </main>
  );
};

export default Blog;
