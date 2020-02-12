import React, { useEffect } from 'react';
import useNavigation from '../containers/Navigation/useNavigation';

function PopUpWindow({children, isCloseable}) {
    const { changeWindow } = useNavigation();
    const closeButton = isCloseable ? (<><button className="zeroStyleButton" onClick={() => changeWindow(null)}><span className="icon-cancel-circled"></span></button><br /></>) : "";
    const ownElement = React.createRef();
    const parentElement = React.createRef();
    useEffect(() => {
        const ownRect = ownElement.current.getBoundingClientRect();
        const parentRect = parentElement.current.getBoundingClientRect();
        
        ownElement.current.style.top = (parentRect.height / 2 - ownRect.height / 2) + "px";
        ownElement.current.style.left = (parentRect.width / 2 - ownRect.width / 2) + "px";
    })
    return (
        <div className="popUpWindow" ref={parentElement}>
            <div className="window" ref={ownElement}>
                {closeButton}
                {children}
            </div>
        </div>
    );
}

export default PopUpWindow;