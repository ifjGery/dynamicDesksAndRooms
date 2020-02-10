import { NAVIGATE_FORWARD, NAVIGATE_BACKWARD, CHANGE_WINDOW } from './constants';

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