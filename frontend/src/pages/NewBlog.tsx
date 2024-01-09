import { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import BlogForm from "../components/BlogForm";

const NewBlog = () => {
  const { user } = useUser();

  const [newBlog, setNewBlog] = useState({
    title: "",
    body: "",
    published: false,
  });

  const postNewBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`http://localhost:3000/blogs`, newBlog, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setNewBlog({ title: "", body: "", published: false });
  };

  console.log(newBlog);

  return (
    <div>
      <h1>add new blog:</h1>
      <BlogForm onSubmit={postNewBlog} blog={newBlog} setBlog={setNewBlog}/>
    </div>
  );
};

export default NewBlog;
