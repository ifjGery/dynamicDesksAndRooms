import { UPDATE_FEEDBACK_ID } from './constants';

/**
 * Disclamer: this wont trigger a re-render, since we mutate our root state instead of creating a new one
 */

const initialState = null;

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_FEEDBACK_ID: {
            return action.payload
        }
        default:
            return state;
    }
}