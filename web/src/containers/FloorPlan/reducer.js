import { SAVE_MAP_STATE } from './constants';

const initialState = {
    zoom: 1,
    pan: {
        x:0,
        y:0
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_MAP_STATE: {
            return {
                ...state,
                ...action.payload.mapState
            };
        }
        default:
            return state;
    }
}