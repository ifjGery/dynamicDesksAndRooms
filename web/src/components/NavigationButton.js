import React from 'react';
import useNavigation from '../containers/Navigation/useNavigation';
import { FORWARD, BACKWARD } from './constants';

function NavigationButton({children, direction, nextPage, isRootNavigation, onClick}) {
    const {navigateForward, navigateBackward} = useNavigation();
    let navigate;
    switch(direction) {
        case FORWARD:
            navigate = () => {onClick && onClick(); navigateForward(nextPage, isRootNavigation);}
            break;
        case BACKWARD:
            navigate = () => {onClick && onClick(); navigateBackward();}
            break;
        default:
            return;
    }
    return (
        <>
            <button className="navButton" onClick={navigate}>{children}</button>
        </>
    );
}

export default NavigationButton;