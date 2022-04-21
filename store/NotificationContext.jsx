import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null,
  show: (notification) => {},
  hide: () => {}
});

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (
      notification &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const show = (data) => {
    setNotification(data);
  };

  const hide = () => {
    setNotification(null);
  };
  const context = {
    notification: notification,
    show: show,
    hide: hide
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
