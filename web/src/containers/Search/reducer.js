import { NEW_SEARCH } from './constants';

const initialState = {};

export default function (state = initialState, action) {
    const data = action.payload;
    switch(action.type) {
        case NEW_SEARCH: {
            return data;
        }
        default:
            return state;
    }
}