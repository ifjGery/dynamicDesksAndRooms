import { CREATE_NOTIFICATION, UPDATE_NOTIFICATION, DELETE_NOTIFICATION } from './constants';

export const createNotification = data => ({
    type: CREATE_NOTIFICATION,
    payload: {...data}
});

export const updateNotification = data => ({
    type: UPDATE_NOTIFICATION,
    payload: {...data}
});

export const deleteNotification = data => ({
    type: DELETE_NOTIFICATION,
    payload: {...data}
});