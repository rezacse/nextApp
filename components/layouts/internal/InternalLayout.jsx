import { useContext } from 'react';
import NotificationContext from '../../../store/NotificationContext';
import Notification from '../../ui/Notification/Notification';
import MainHeader from './MainHeader';

function InternalLayout(props) {
  const notificationCtx = useContext(NotificationContext);

  const notification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

export default InternalLayout;
