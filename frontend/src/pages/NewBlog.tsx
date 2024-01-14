import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { useNotificationHelper } from "../helpers";

const NewBlog = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const notifyAndReset = useNotificationHelper();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  const [newBlog, setNewBlog] = useState({
    title: "",
    body: "",
    published: false,
  });

  const postNewBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/blogs`, newBlog, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        setNewBlog({ title: "", body: "", published: false });
        notifyAndReset("new blog posted successfully");
      })
      .catch((err) => {
        console.log(err);
        notifyAndReset("there was an error with posting new blog");
      });
  };

  console.log(newBlog);

  return (
    <div>
      <h1>add new blog:</h1>
      <BlogForm onSubmit={postNewBlog} blog={newBlog} setBlog={setNewBlog} />
    </div>
  );
};

export default NewBlog;
