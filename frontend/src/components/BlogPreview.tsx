import { Link } from "react-router-dom";
import { BlogType } from "../interfaces";
import DateDisplay from "./DateDisplay";

interface BlogPreviewProps {
  blog: BlogType;
  className: string;
}

const BlogPreview = ({ blog, className }: BlogPreviewProps) => {
  return (
    <li className={`${className}`}>
      <article>
        <Link to={blog.title}>
          <h3>{blog.title}</h3>
          {!blog.published && <p>unpublished</p>}
          <p>{blog.comments?.length} comments</p>
          <DateDisplay blog={blog} action="created" />
        </Link>
      </article>
    </li>
  );
};

export default BlogPreview;
