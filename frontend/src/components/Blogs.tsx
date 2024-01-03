import axios from "axios";

const Blogs = () => {
  const promise = axios.get("http://localhost:3000/blogs");

  promise.then((res) => {
    console.log(res);
  });

  return (
    <div>
      <p>All published blogs will be rendered here:</p>
    </div>
  );
};

export default Blogs;
