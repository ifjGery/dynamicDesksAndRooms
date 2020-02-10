import { CREATE_NOTIFICATION, UPDATE_NOTIFICATION, DELETE_NOTIFICATION } from './constants';

const initialState = [];

export default function(state = initialState, action) {
    const data = action.payload;
    switch(action.type) {
        case CREATE_NOTIFICATION: {
            return state.concat([{...data}]);
        }
        case UPDATE_NOTIFICATION: {
            let newState = [];
            state.map((notification) => {
                if (notification.timestamp === data.timestamp &&
                    notification.id === data.id) {
                    newState = newState.concat([{...notification, ...data}]);
                } else {
                    newState = newState.concat([notification]);
                }
            })
            return newState;
        }
        case DELETE_NOTIFICATION: {
            let newState = [];
            state.map(notification => {
                if (notification.timestamp !== data.timestamp ||
                    notification.id !== data.id) {
                    newState = newState.concat([notification]);
                }
            });
            return newState;
        }
        default:
            return state;
    }
}