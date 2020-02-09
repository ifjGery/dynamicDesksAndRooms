import React, { useState } from 'react';
import BackNavigation from '../containers/Navigation/BackNavigation';

function NotificationEditor({notification}) {
    return (
        <>
            <br />
            onFree: <input type="checkbox" /><br />
            onReserved: <input type="checkbox" /><br />
            important: <input type="checkbox" /><br />
            <button>Save</button>
        </>
    );
}

function Notification({list, selected, onSelected}) {
    const listItems = list.map((item, index) => 
    <li key={"notif_" + index}>
        {item.onId} {item.onFreed ? "onFree" : ""} {item.onReserved ? "onRes" : ""} {item.isImportant ? "!!!" : ""} 
        <button onClick={() => onSelected(index)} >Edit</button>
        <button>Del</button>
        {index === selected && <NotificationEditor notification={item} />}
    </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

function NotificationManager() {
    const [ selectedNotification, setSelectedNotification ] = useState(null);
    const [ notifications, setNotifications ] = useState([
        {
            "onId": "id_113",
            "onFreed": false,
            "onReserved": true,
            "isImportant": false
        },
        {
            "onId": "id_114",
            "onFreed": true,
            "onReserved": true,
            "isImportant": true
        }
    ]);

    return (
        <div className="notificationManager">
            <BackNavigation />
            <Notification list={notifications} selected={selectedNotification} onSelected={setSelectedNotification} />
        </div>
    )
}

export default NotificationManager;