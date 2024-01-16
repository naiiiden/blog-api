import { Link } from "react-router-dom";
import { BlogType } from "../interfaces";
import DateDisplay from "./DateDisplay";

interface BlogPreviewProps {
  blog: BlogType;
  className: string;
}

const BlogPreview = ({ blog, className }: BlogPreviewProps) => {
  return (
    <li className={`outline outline-1 outline-blue-700 rounded p-4 hover:outline-4 focus-within:outline-4 ${className}`}>
      <article className="h-full">
        <Link to={blog.title} className="outline-none flex flex-col h-full">
          <h3 className="mb-auto text-xl flex items-center md:text-2xl">{blog.title} {!blog.published && <span className="text-xs">- unpublished</span>}</h3>
          <p className="mt-4 ml-auto text-sm">{blog.comments?.length} comments</p>
          <DateDisplay className="ml-auto text-sm" blog={blog} action="published" />
        </Link>
      </article>
    </li>
  );
};

export default BlogPreview;
