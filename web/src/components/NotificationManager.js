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
        <div className="setting">
            <div>
                <span>onFree:</span><input type="checkbox" checked={singleNotification.onFreed} name="onFreed" onChange={handler}/><br />
                <span>onReserved:</span><input type="checkbox" checked={singleNotification.onReserved} name="onReserved" onChange={handler}/><br />
                <span>important:</span><input type="checkbox" checked={singleNotification.isImportant} name="isImportant" onChange={handler}/><br />
            </div>
            <div><button onClick={update}>Save</button></div>
        </div>
    );
}

function Notification({list, selected, onSelected, onUpdate, onDelete}) {
    const listItems = list.map((item, index) => 
    <li key={"notif_" + index}>
        <div className="record">
            <span className="name">{item.onId}</span>
            {item.onFreed ? <span className="fontello icon-logout"></span> : ""}
            {item.onReserved ? <span className="fontello icon-login"></span> : ""}
            {item.isImportant ? <span className="fontello icon-attention-alt"></span> : ""} 
            <button onClick={() => onSelected(index)} ><span className="fontello icon-cog"></span></button>
            <button onClick={() => onDelete(item)}><span className="fontello icon-trash"></span></button>
        </div>
        {index === selected && <NotificationEditor notification={item} onUpdate={onUpdate} />}
    </li>
    );
    return (
        <ul className="notifications">{listItems}</ul>
    );
}

function NotificationManager() {
    const [ selectedNotification, setSelectedNotification ] = useState(null);
    const { notificationSettings, updateNotification, deleteNotification } = useNotificationSettings();
    const notifications = notificationSettings;

    return (
        <div className="notificationManager">
            <NavigationButton direction={BACKWARD}><span className="fontello icon-left-big"></span></NavigationButton>
            <Notification list={notifications} selected={selectedNotification} onSelected={setSelectedNotification} onUpdate={updateNotification} onDelete={deleteNotification} />
        </div>
    )
}

export default NotificationManager;