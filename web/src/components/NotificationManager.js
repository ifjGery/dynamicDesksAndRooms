import React, { useState } from 'react';
import {BACKWARD} from './constants';
import NavigationButton from './NavigationButton';
import useNotificationSettings from '../containers/NotificationSettings/useNotificationSettings';

function NotificationEditor({notification, onUpdate}) {
    const [ singleNotification, setSingleNotification ] = useState({...notification});
    const update = () => {
        onUpdate({...notification, ...singleNotification});
    }

    const handler = e => setSingleNotification({...singleNotification, [e.target.name] : e.target.checked});
    return (
        <>
            <br />
            onFree: <input type="checkbox" checked={singleNotification.onFreed} name="onFreed" onChange={handler}/><br />
            onReserved: <input type="checkbox" checked={singleNotification.onReserved} name="onReserved" onChange={handler}/><br />
            important: <input type="checkbox" checked={singleNotification.isImportant} name="isImportant" onChange={handler}/><br />
            <button onClick={update}>Save</button>
        </>
    );
}

function Notification({list, selected, onSelected, onUpdate, onDelete}) {
    const listItems = list.map((item, index) => 
    <li key={"notif_" + index}>
        {item.onId} {item.onFreed ? "onFree" : ""} {item.onReserved ? "onRes" : ""} {item.isImportant ? "!!!" : ""} 
        <button onClick={() => onSelected(index)} >Edit</button>
        <button onClick={() => onDelete(item)}>Del</button>
        {index === selected && <NotificationEditor notification={item} onUpdate={onUpdate} />}
    </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

function NotificationManager() {
    const [ selectedNotification, setSelectedNotification ] = useState(null);
    const { notificationSettings, updateNotification, deleteNotification } = useNotificationSettings();
    const notifications = notificationSettings;

    return (
        <div className="notificationManager">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton>
            <Notification list={notifications} selected={selectedNotification} onSelected={setSelectedNotification} onUpdate={updateNotification} onDelete={deleteNotification} />
        </div>
    )
}

export default NotificationManager;