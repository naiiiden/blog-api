interface DateDisplayProps {
  blog: {
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  action?: string;
  isComment?: boolean;
  className?: string;
}

// update formatting later
const DateDisplay = ({ blog, action, isComment, className }: DateDisplayProps) => {
  return (
    <>
      {isComment ? (
        <p className={`${className}`}>
          {new Date(blog.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      ) : (
        <p className={`${className}`}>
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
