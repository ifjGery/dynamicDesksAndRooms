import React from 'react';
import useNavigation from '../containers/Navigation/useNavigation';
import { FORWARD, BACKWARD } from './constants';

function NavigationButton({children, direction, nextPage, isRootNavigation}) {
    const {navigateForward, navigateBackward} = useNavigation();
    let navigate;
    switch(direction) {
        case FORWARD:
            navigate = () => navigateForward(nextPage, isRootNavigation);
            break;
        case BACKWARD:
            navigate = () => navigateBackward();
            break;
        default:
            return;
    }
    return (
        <>
            <button onClick={navigate}>{children}</button>
        </>
    );
}

export default NavigationButton;