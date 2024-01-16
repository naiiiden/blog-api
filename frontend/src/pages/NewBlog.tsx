import { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import BlogForm from "../components/BlogForm";
import { useNotificationHelper } from "../helpers";

const NewBlog = () => {
  const { user } = useUser();
  const notifyAndReset = useNotificationHelper();

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
    <div className="p-4 mx-auto max-w-7xl md:p-8">
      <h1 className="text-2xl md:text-4xl">Add a new blog:</h1>
      <BlogForm onSubmit={postNewBlog} blog={newBlog} setBlog={setNewBlog} />
    </div>
  );
};

export default NewBlog;
