import { CREATE_NOTIFICATION, READ_NOTIFICATION, MAX_NOTIFICATION } from './constants';

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_NOTIFICATION: {
            return state.concat([action.payload]).slice(-MAX_NOTIFICATION);
        }
        case READ_NOTIFICATION: {
            return state.map(notification => ({
                ...notification,
                seen: true
            }))
        }
        default:
            return state;
    }
}