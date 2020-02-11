import { CREATE_NOTIFICATION, READ_NOTIFICATION } from './constants';

export const createNotification = data => ({
    type: CREATE_NOTIFICATION,
    payload: {
        ...data
    }
});

export const readNotification = data => ({
    type: READ_NOTIFICATION,
    payload: {
        ...data
    }
});