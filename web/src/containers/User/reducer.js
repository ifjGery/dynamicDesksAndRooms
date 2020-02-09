import { USER_LOGIN } from './constants';

const initialState = {
    nick: '',
    contact: '',
    isLeftHanded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}