interface NotificationProps {
  notificationMessage: string | null;
}

const Notification = ({ notificationMessage }: NotificationProps) => {
  if (notificationMessage !== null) {
    return <p>{notificationMessage}</p>;
  }
};

export default Notification;
