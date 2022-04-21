import { useContext } from 'react';

import classes from './notification.module.css';
import NotificationContext from '../../../store/NotificationContext';

function Notification({ title, message, status }) {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') statusClasses = classes.success;
  else if (status === 'error') statusClasses = classes.error;
  else if (status === 'pending') statusClasses = classes.pending;

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hide}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
