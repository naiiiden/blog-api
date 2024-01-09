import { CommentType } from "../interfaces";

const Comment = ({ comment, onClick }: CommentType) => {
  return (
    <li>
      <button onClick={onClick}>delete comment</button>
      <div>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
