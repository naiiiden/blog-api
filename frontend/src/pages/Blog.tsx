import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "../interfaces";
import Comment from "../components/Comment";

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

  const [newComment, setNewComment] = useState({
    author: "",
    body: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${blogId}`).then((res) => {
      setBlog(res.data);
    });
  }, [blogId]);

  console.log(blog);

  const postComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`http://localhost:3000/blogs/${blogId}/comments`, {
      author: newComment.author,
      body: newComment.body,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setBlog((prevBlog) => ({
      ...prevBlog,
      comments: [
        ...prevBlog.comments,
        { author: newComment.author, body: newComment.body },
      ],
    }));

    setNewComment({ author: "", body: "" });
  };

  console.log(1, newComment);

  const [updateBlog, setUpdateBlog] = useState(false);
  console.log(updateBlog);

  return (
    <div>
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
          {blog.comments.map((comment, index) => {
            return <Comment comment={comment} key={comment._id || index} />;
          })}
        </ol>
      )}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onSubmit={postComment}
      >
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="name or post anonymously"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
        />
        <label htmlFor="body">message:</label>
        <textarea
          name="body"
          id="body"
          cols={50}
          rows={10}
          placeholder="write your comment here"
          value={newComment.body}
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
        ></textarea>
        <input type="submit" value="submit" />
      </form>

      <button onClick={() => setUpdateBlog(!updateBlog)}>update blog</button>
      {updateBlog && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={blog.title}
            // onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <label htmlFor="body">body:</label>
          <textarea
            name="body"
            id="body"
            cols={30}
            rows={10}
            value={blog.body}
            // onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
          ></textarea>
          <fieldset>
            <legend>published:</legend>
            <label htmlFor="yes">yes:</label>
            <input
              type="radio"
              name="published"
              id="yes"
              // onChange={() => setNewBlog({ ...newBlog, published: true })}
              checked={blog.published === true}
            />
            <label htmlFor="no">no:</label>
            <input
              type="radio"
              name="published"
              id="no"
              // onChange={() => setNewBlog({ ...newBlog, published: false })}
              checked={blog.published === false}
            />
          </fieldset>
          <input type="submit" value="submit" />
        </form>
      )}
    </div>
  );
};

export default Blog;
