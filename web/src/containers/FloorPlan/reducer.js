import { SAVE_MAP_STATE, UPDATE_SELECTABLE_STATE } from './constants';

const initialState = {
    zoom: 1,
    pan: {
        x:0,
        y:0
    },
    reserved: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_MAP_STATE: {
            console.log(action);
            return {
                ...state,
                pan: action.payload.mapState.pan,
                zoom: action.payload.mapState.zoom,
            };
        }
        case UPDATE_SELECTABLE_STATE: {
            return {
                ...state,
                reserved : {
                    ...state.reserved,
                    ["id_" + action.payload.id] : action.payload.reserved
                }
            };
        }
        default:
            return state;
    }
}