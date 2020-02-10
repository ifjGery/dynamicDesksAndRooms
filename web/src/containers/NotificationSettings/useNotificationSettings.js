import { useSelector, useDispatch } from 'react-redux';
import {
    createNotification as createNotificationAction,
    updateNotification as updateNotificationAction,
    deleteNotification as deleteNotificationAction
} from './actions';

function useReservations() {
    const dispatch = useDispatch();
    const notificationSettings = useSelector(state => {
        return state.notificationSettings
    });
    const createNotification = data => dispatch(createNotificationAction(data));
    const updateNotification = data => dispatch(updateNotificationAction(data));
    const deleteNotification = data => dispatch(deleteNotificationAction(data));

    return {
        notificationSettings,
        createNotification,
        updateNotification,
        deleteNotification
    }
}

export default useReservations;