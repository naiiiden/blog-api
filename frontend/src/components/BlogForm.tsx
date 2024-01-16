// add types l8r
const BlogForm = ({ onSubmit, blog, setBlog }) => {
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <label className="pt-2 md:pt-4 pb-1 md:text-lg" htmlFor="title">
        Title:
      </label>
      <input
        className="border rounded p-2"
        type="text"
        name="title"
        id="title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />
      <label className="pt-2 md:pt-4 pb-1 md:text-lg" htmlFor="body">
        Body:
      </label>
      <textarea
        className="min-h-48 border rounded p-2"
        name="body"
        id="body"
        value={blog.body}
        onChange={(e) => setBlog({ ...blog, body: e.target.value })}
      ></textarea>
      <fieldset className="flex items-center gap-2">
        <legend className="pt-2 md:pt-4 pb-1 md:text-lg">Published:</legend>
        <label className="md:text-lg" htmlFor="yes">
          Yes:
        </label>
        <input
          type="radio"
          name="published"
          id="yes"
          onChange={() => setBlog({ ...blog, published: true })}
          checked={blog.published === true}
        />
        <label className="md:text-lg" htmlFor="no">
          No:
        </label>
        <input
          type="radio"
          name="published"
          id="no"
          onChange={() => setBlog({ ...blog, published: false })}
          checked={blog.published === false}
        />
      </fieldset>
      <input
        className="rounded border my-2 md:my-4 py-2"
        type="submit"
        value="Update blog"
      />
    </form>
  );
};

export default BlogForm;
