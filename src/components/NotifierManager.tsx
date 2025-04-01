import React, { useState } from "react";
import Notifier from "@components/Notifier";

type Notification = {
  message: string;
  type: "success" | "error" | "info";
};

let showNotification: (
  message: string,
  type: "success" | "error" | "info"
) => void;

function NotifierManager() {
  const [notification, setNotification] = useState<Notification | null>(null);

  showNotification = (message, type) => {
    setNotification({ message, type });
  };

  return notification ? (
    <Notifier
      message={notification.message}
      type={notification.type}
      onHide={() => setNotification(null)}
    />
  ) : null;
}

export { showNotification };
export default NotifierManager;
