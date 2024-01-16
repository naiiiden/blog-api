interface DateDisplayProps {
  blog: {
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  action?: string;
  isComment?: boolean;
  className?: string;
  showAction?: boolean;
}

// update formatting later
const DateDisplay = ({ blog, action, isComment, className, showAction = false }: DateDisplayProps) => {
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
          {showAction && <span>{action === "created" ? "created" : "updated"}: </span>}
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
