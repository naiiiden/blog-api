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
    <li className="md:text-lg">
      <div className="flex flex-wrap items-center">
        <p>
          <span className="font-medium">{comment.author}</span> wrote -&nbsp;
        </p>{" "}
        <DateDisplay
          blog={blog}
          isComment={true}
          className="text-base italic"
        />
        {user !== null && (
          <button onClick={onClick} className="ml-auto text-base">
            delete
          </button>
        )}
      </div>
      <p className="py-2">{comment.body}</p>
    </li>
  );
};

export default Comment;
