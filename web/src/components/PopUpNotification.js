import React from 'react';

function PopUpNotification({text, onUp, onDown, onClose, onClick}) {
    return (
        <div className="popUpNotification">
            <button onClick={onUp}>Up</button>
            <button onClick={onDown}>Down</button>
            <button onClick={onClick}>{text}</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default PopUpNotification;