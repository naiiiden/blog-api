import { Link } from "react-router-dom";
import { BlogType } from "../interfaces";

interface BlogPreviewProps {
  blog: BlogType;
  className: string;
}

const BlogPreview = ({ blog, className }: BlogPreviewProps) => {
  return (
    <li className={`${className}`}>
      {!blog.published && <p>unpublished</p>}
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
