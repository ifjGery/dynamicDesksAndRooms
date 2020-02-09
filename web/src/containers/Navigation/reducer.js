import { NAVIGATE_FORWARD, NAVIGATE_BACK, CHANGE_WINDOW } from './constants';

const initialState = {
    activePage: null,
    navigationHistory: []
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
        case NAVIGATE_BACK: {
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
        default:
            return state;
    }
}