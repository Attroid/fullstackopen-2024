import { forwardRef, useImperativeHandle, useState, useCallback } from "react";

const Notification = forwardRef((_, ref) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback(
    (message, type) => {
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
    },
    [notification]
  );

  useImperativeHandle(
    ref,
    () => ({
      showSuccess: (message) => showNotification(message, "success"),
      showError: (message) => showNotification(message, "error"),
    }),
    [showNotification]
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

Notification.displayName = "Notification";

export default Notification;
