import { useNotification } from "./NotificationContext";

export const useNotificationHelper = () => {
  const { setNotificationMessage } = useNotification();

  const notifyAndReset = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  return notifyAndReset;
};

