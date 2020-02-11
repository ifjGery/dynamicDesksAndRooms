import { USER_UPDATE } from './constants';

const initialState = {
    nick: '',
    contact: '',
    isLeftHanded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_UPDATE: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}