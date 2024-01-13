import { CommentType, BlogType } from "../interfaces";
import DateDisplay from "./DateDisplay";
import { useUser } from "../UserContext";

interface CommentProps extends CommentType {
  blog: BlogType;
  onClick: () => void;
}

const Comment = ({ comment, blog, onClick }: CommentProps) => {
  const { user } = useUser();

  return (
    <li>
      {user !== null && <button onClick={onClick}>delete comment</button>}
      <div>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
      </div>
      <DateDisplay blog={blog} isComment={true} />
    </li>
  );
};

export default Comment;
