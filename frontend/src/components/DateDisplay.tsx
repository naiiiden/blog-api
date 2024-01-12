interface DateDisplayProps {
  blog: {
    createdAt: Date | string;
    updatedAt: Date | string;
  };
  action: string;
}

const DateDisplay = ({ blog, action }: DateDisplayProps) => {
  return (
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
  );
};

export default DateDisplay;
