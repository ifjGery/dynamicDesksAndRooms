import { NAVIGATE_FORWARD, NAVIGATE_BACK, CHANGE_WINDOW } from './constants';

export const navigateForward = (nextPage, isRootNavigation) => ({
    type: NAVIGATE_FORWARD,
    payload: {
        nextPage,
        isRootNavigation
    }
});

export const navigateBack = () => ({
    type: NAVIGATE_BACK,
    payload: {}
});

export const changeWindow = (newActiveWindow) => ({
    type: CHANGE_WINDOW,
    payload: {
        activeWindow: newActiveWindow
    }
});