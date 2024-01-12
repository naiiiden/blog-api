import { CommentType, BlogType } from "../interfaces";
import DateDisplay from "./DateDisplay";

interface CommentProps extends CommentType {
  blog: BlogType;
  onClick: () => void;
}

const Comment = ({ comment, blog, onClick }: CommentProps) => {
  return (
    <li>
      <button onClick={onClick}>delete comment</button>
      <div>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
      </div>
      <DateDisplay blog={blog} isComment={true} />
    </li>
  );
};

export default Comment;
