import { CommentType } from "../interfaces";

const Comment = ({ comment }: CommentType) => {
  return (
    <li>
      <div>
        <p>{comment.author}</p>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
