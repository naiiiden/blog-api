import { Link } from "react-router-dom";
import { BlogType } from "../interfaces";

interface BlogPreviewProps {
  blog: BlogType;
}

const BlogPreview = ({ blog }: BlogPreviewProps) => {
  return (
    <li
      style={{
        border: "1px solid red",
        padding: "1rem",
      }}
    >
      <Link to={blog.title}>{blog.title}</Link>
      <p>{blog.comments?.length} comments</p>
      <p>
        created:{" "}
        {new Date(blog.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </li>
  );
};

export default BlogPreview;
