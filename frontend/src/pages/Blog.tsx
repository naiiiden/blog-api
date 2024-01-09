import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "../interfaces";
import Comment from "../components/Comment";
import { useUser } from "../UserContext";
import BlogForm from "../components/BlogForm";

const Blog = () => {
  const { user } = useUser();
  const navigate = useNavigate();

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

  const [updateBlogModal, setUpdateBlogModal] = useState(true);

  const [blogUpdate, setBlogUpdate] = useState({
    title: blog.title,
    body: blog.body,
    published: blog.published,
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${blogId}`).then((res) => {
      setBlog(res.data);
      setBlogUpdate({
        title: res.data.title,
        body: res.data.body,
        published: res.data.published,
      });
    });
  }, [blogId]);

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

  const updateBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/blogs/${blogId}`, blogUpdate, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setBlog({
      ...blog,
      title: blogUpdate.title,
      body: blogUpdate.body,
      published: blogUpdate.published,
    });
  };

  const deleteBlog = () => {
    axios
      .delete(`http://localhost:3000/blogs/${blogId}`)
      .then(() => navigate("/"));
  };

  return (
    <div>
      <button onClick={deleteBlog}>delete blog</button>
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

      <button onClick={() => setUpdateBlogModal(!updateBlogModal)}>
        update blog
      </button>
      {updateBlogModal && (
        <BlogForm
          onSubmit={updateBlog}
          blog={blogUpdate}
          setBlog={setBlogUpdate}
        />
      )}
    </div>
  );
};

export default Blog;
