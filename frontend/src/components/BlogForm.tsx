// add types l8r
const BlogForm = ({ onSubmit, blog, setBlog }) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
      onSubmit={onSubmit}
    >
      <label htmlFor="title">title:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <label htmlFor="body">body:</label>
      <textarea
        name="body"
        id="body"
        cols={30}
        rows={10}
        value={blog.body}
        onChange={(e) => setBlog({ ...blog, body: e.target.value })}
      ></textarea>
      <fieldset>
        <legend>published:</legend>
        <label htmlFor="yes">yes:</label>
        <input
          type="radio"
          name="published"
          id="yes"
          onChange={() => setBlog({ ...blog, published: true })}
          checked={blog.published === true}
        />
        <label htmlFor="no">no:</label>
        <input
          type="radio"
          name="published"
          id="no"
          onChange={() => setBlog({ ...blog, published: false })}
          checked={blog.published === false}
        />
      </fieldset>
      <input type="submit" value="submit" />
    </form>
  );
};

export default BlogForm;
