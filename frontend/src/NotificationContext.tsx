import React, { createContext, useContext, ReactNode, useState } from "react";

interface NotificationContextProps {
  notificationMessage: string | null;
  setNotificationMessage: (message: string | null) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  return (
    <NotificationContext.Provider
      value={{ notificationMessage, setNotificationMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
