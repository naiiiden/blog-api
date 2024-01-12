interface DateDisplayProps {
  blog: {
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  action?: string;
  isComment?: boolean;
}

// update formatting later
const DateDisplay = ({ blog, action, isComment }: DateDisplayProps) => {
  return (
    <>
      {isComment ? (
        <p>
          {new Date(blog.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      ) : (
        <p>
          {action === "created" ? "created" : "updated"}:{" "}
          {new Date(
            action === "created" ? blog.createdAt : blog.updatedAt
          ).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </>
  );
};

export default DateDisplay;
