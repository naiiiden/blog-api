import { useState } from "react";
import axios from "axios";

const NewBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    body: "",
    // author: "",
    published: false,
  });

  const postNewBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`http://localhost:3000/blogs`, {});
  };

  console.log(newBlog);

  return (
    <div>
      <h1>add new blog:</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
        onSubmit={postNewBlog}
      >
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <label htmlFor="body">body:</label>
        <textarea
          name="body"
          id="body"
          cols={30}
          rows={10}
          onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
        ></textarea>
        {/* user */}
        <fieldset>
          <legend>published:</legend>
          <label htmlFor="yes">yes:</label>
          <input
            type="radio"
            name="published"
            id="yes"
            onChange={() => setNewBlog({ ...newBlog, published: true })}
          />
          <label htmlFor="no">no:</label>
          <input
            type="radio"
            name="published"
            id="no"
            onChange={() => setNewBlog({ ...newBlog, published: false })}
          />
        </fieldset>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default NewBlog;
