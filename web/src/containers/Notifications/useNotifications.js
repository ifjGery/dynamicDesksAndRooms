import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { 
    createNotification as createNotificationAction,
    readNotification as readNotificationAction
 } from './actions';

 function useNotifications() {
     const dispatch = useDispatch();
     const notifications = useSelector(state => state.notifications);
     const importantNotifications = notifications.filter(one => one.isImportant && !one.seen);
     const createNotification = data => dispatch(createNotificationAction(data));
     const readNotification = data => dispatch(readNotificationAction(data));

     return {
        notifications,
        importantNotifications,
        createNotification,
        readNotification
     };
 }

 export default useNotifications;