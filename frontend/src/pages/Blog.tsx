import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "../interfaces";
import Comment from "../components/Comment";
import { useUser } from "../UserContext";
import BlogForm from "../components/BlogForm";
import DateDisplay from "../components/DateDisplay";
import { useNotificationHelper } from "../helpers";

const Blog = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const notifyAndReset = useNotificationHelper();

  const { blogName } = useParams();
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
    axios
      .get(`http://localhost:3000/blogs/${blogName}`)
      .then((res) => {
        setBlog(res.data);
        setBlogUpdate({
          title: res.data.title,
          body: res.data.body,
          published: res.data.published,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogName]);

  const postComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/blogs/${blogName}/comments`, {
        author:
          newComment.author.trim() !== ""
            ? newComment.author
            : "Anonymous author",
        body: newComment.body,
      })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: [
            ...prevBlog.comments,
            {
              author:
                newComment.author.trim() !== ""
                  ? newComment.author
                  : "Anonymous author",
              body: newComment.body,
            },
          ],
        }));

        setNewComment({ author: "", body: "" });
        notifyAndReset("comment added successfully");
      })
      .catch(
        (err) => (
          console.log(err),
          notifyAndReset("there was an issue submitting a comment")
        )
      );
  };

  const updateBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/blogs/${blogName}`, blogUpdate, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        setBlog({
          ...blog,
          title: blogUpdate.title,
          body: blogUpdate.body,
          published: blogUpdate.published,
        });

        navigate(`/${blogUpdate.title}`);

        notifyAndReset("blog updated successfully");
      })
      .catch(
        (err) => (
          console.log(err),
          notifyAndReset("there was an issue with updating the blog")
        )
      );
  };

  const deleteBlog = () => {
    axios
      .delete(`http://localhost:3000/blogs/${blogName}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        navigate("/"), notifyAndReset("blog deleted successfully");
      })
      .catch(
        (err) => (
          console.log(err),
          notifyAndReset("there was an issue with deleting the blog")
        )
      );
  };

  const deleteComment = (commentId: string) => {
    axios
      .delete(`http://localhost:3000/blogs/${blogName}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: prevBlog.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
        notifyAndReset("comment deleted successfully");
      })
      .catch(
        (err) => (
          console.log(err),
          notifyAndReset("there was an issue with deleting the comment")
        )
      );
  };

  return (
    <div className="p-4 mx-auto max-w-7xl md:p-8">
      <h1 className="text-2xl md:text-4xl">{blog.title}</h1>
      <p className="py-2 md:py-4 italic text-right">
        published by {blog.user.username}
      </p>
      <p className="text-lg">{blog.body}</p>
      <div className="py-2 md:py-4 italic text-right">
        <DateDisplay blog={blog} action="published" showAction={true} />
        {new Date(blog.createdAt).toDateString() !==
          new Date(blog.updatedAt).toDateString() && (
          <DateDisplay blog={blog} action="updated" showAction={true} />
        )}
      </div>
      <p className="text-xl md:text-2xl">comments ({blog.comments?.length}): </p>
      {Number(blog.comments?.length) === 0 ? (
        <p>be the first to drop a comment</p>
      ) : (
        <ol className="py-2 md:py-4">
          {blog.comments.map((comment, index) => {
            return (
              <Comment
                blog={blog}
                comment={comment}
                key={comment._id || index}
                onClick={() => deleteComment(comment._id)}
              />
            );
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
        <label htmlFor="comment-author">name:</label>
        <input
          type="text"
          name="comment-author"
          id="comment-author"
          placeholder="name or post anonymously"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
        />
        <label htmlFor="comment-body">message:</label>
        <textarea
          name="comment-body"
          id="comment-body"
          cols={10}
          rows={10}
          placeholder="write your comment here"
          value={newComment.body}
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
        ></textarea>
        <input type="submit" value="submit" />
      </form>
      {user !== null && (
        <>
          <button onClick={deleteBlog}>delete blog</button>
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
        </>
      )}
    </div>
  );
};

export default Blog;
