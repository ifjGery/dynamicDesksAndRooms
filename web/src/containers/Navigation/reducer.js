import { NAVIGATE_FORWARD, NAVIGATE_BACKWARD, CHANGE_WINDOW, CHANGE_SELECTION } from './constants';

const initialState = {
    activePage: null,
    navigationHistory: [],
    activeSelection: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NAVIGATE_FORWARD: {
            const newHistory = action.payload.isRootNavigation ? 
                action.payload.nextPage === null ? [] : [action.payload.nextPage] 
                    : state.navigationHistory.concat([action.payload.nextPage])
            return {
                ...state,
                activePage: action.payload.nextPage,
                navigationHistory: newHistory
            };
        }
        case NAVIGATE_BACKWARD: {
            const newHistory = state.navigationHistory.slice(0,-1);
            const newActivePage = newHistory.length ? newHistory[newHistory.length -1] : null;
            return {
                ...state,
                activePage: newActivePage,
                navigationHistory: newHistory,
            }
        }
        case CHANGE_WINDOW: {
            return {
                ...state,
                activeWindow: action.payload.activeWindow
            }
        }
        case CHANGE_SELECTION: {
            return {
                ...state,
                activeSelection: action.payload.activeSelection
            }
        }
        default:
            return state;
    }
}