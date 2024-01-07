const NewBlog = () => {
  return (
    <div>
      <h1>add new blog:</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <label htmlFor="title">title:</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="body">body:</label>
        <textarea name="body" id="body" cols={30} rows={10}></textarea>
        {/* user */}
        <fieldset>
          <legend>published:</legend>
          <label htmlFor="yes">yes:</label>
          <input type="radio" name="published" id="yes" />
          <label htmlFor="no">no:</label>
          <input type="radio" name="published" id="no" />
        </fieldset>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default NewBlog;
