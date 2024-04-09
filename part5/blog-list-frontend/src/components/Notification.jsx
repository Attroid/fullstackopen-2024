import { forwardRef, useImperativeHandle, useState } from "react";

const Notification = forwardRef((_, ref) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    if (notification) {
      clearTimeout(notification.timeoutId);
    }

    setNotification({
      message,
      type,
      timeoutId: setTimeout(() => {
        setNotification(null);
      }, 5000),
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      showSuccess: (message) => showNotification(message, "success"),
      showError: (message) => showNotification(message, "error"),
    }),
    []
  );

  if (!notification) return null;

  const style = {
    color: notification.type === "success" ? "green" : "red",
    border: "1px solid",
    padding: 16,
    borderRadius: 5,
  };

  return <div style={style}>{notification.message}</div>;
});

export default Notification;
