import { NAVIGATE_FORWARD, NAVIGATE_BACKWARD, CHANGE_WINDOW, CHANGE_SELECTION } from './constants';

export const navigateForward = (nextPage, isRootNavigation) => ({
    type: NAVIGATE_FORWARD,
    payload: {
        nextPage,
        isRootNavigation
    }
});

export const navigateBackward = () => ({
    type: NAVIGATE_BACKWARD,
    payload: {}
});

export const changeWindow = (newActiveWindow) => ({
    type: CHANGE_WINDOW,
    payload: {
        activeWindow: newActiveWindow
    }
});

export const changeSelection = (newSelected) => ({
    type: CHANGE_SELECTION,
    payload: {
        activeSelection: newSelected
    }
})