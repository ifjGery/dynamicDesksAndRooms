import React, { useEffect } from 'react';

function PopUpWindow({onClose, children, isCloseable}) {
    const closeButton = isCloseable ? (<><button onClick={onClose}>X</button><br /></>) : "";
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