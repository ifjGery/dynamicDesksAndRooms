import React, { useState } from 'react';

import FloorSelector from './FloorSelector';
import QuickSearch from './QuickSearch';

import NavigationButton from './NavigationButton';
import {
    NOTIFICATION_MANAGER,
    SETTINGS_MANAGER,
    OWN_RESERVATIONS,
    NOTIFICATION,
    FLOOR_SELECTOR,
    QUICK_SEARCH,
    MENU,
    FORWARD
} from './constants';

import useNotifications from '../containers/Notifications/useNotifications';

function Notification({notification}) {
    const date = new Date(notification.timestamp);
    return (
        <div className="notification">
            <span className="small color-gray">{`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`}</span><br />
            {notification.text}
        </div>
    );
}

function NotificationList({notifications, markRead}) {
    const markAll = () => notifications.map(one => markRead(one));
    return (
        <>
            <button onClick={markAll}>Mark All Readed</button>
            <ul>
                {notifications.map(notification => (
                    <li><Notification notification={notification} /></li>
                ))}
            </ul>
        </>
    );
}

function Header() {
    const { notifications, readNotification } = useNotifications();
    let unread = notifications.reduce((prev, current) => !current.seen ? prev + 1 : prev,0);

    const [activeDropDown, setActiveDropDown] = useState(null);
    const closeDropdown = () => setActiveDropDown(null);
    const dropDownSelector = dropDown => activeDropDown === dropDown ? setActiveDropDown(null) : setActiveDropDown(dropDown);
    const isSelected = dropDown => activeDropDown === dropDown ? 'selected' : '';

    const DropDown = ({visible,children}) => visible ? <div className="dropDown">{children}</div> : '';
    const DropButton = ({dropDown, children, onClick}) => (
        <button onClick={() => dropDownSelector(dropDown)} className={"header_button " + isSelected(dropDown)}>
            {children}
        </button>
    );

    return (
        <div className="header">
            <span>
                <DropButton dropDown={NOTIFICATION}>!<span className="unreadIcon">{unread ? unread : ''}</span></DropButton>
                <DropDown visible={activeDropDown === NOTIFICATION}>
                    <NotificationList notifications={notifications} markRead={readNotification} />
                </DropDown>
            </span>

            <span>
                <DropButton dropDown={FLOOR_SELECTOR} onClick>L2</DropButton>
                {
                    activeDropDown === FLOOR_SELECTOR &&
                    <FloorSelector />
                }
            </span>

            <span className="spacer"></span>

            <span>
                <DropButton dropDown={QUICK_SEARCH}>S</DropButton>
                {
                    activeDropDown === QUICK_SEARCH &&
                    <QuickSearch onClick={closeDropdown} />
                }
            </span>

            <span>
                <DropButton dropDown={MENU}>=</DropButton>
                <DropDown visible={activeDropDown === MENU}>
                    <ul>
                        <li><NavigationButton nextPage={null} direction={FORWARD} isRootNavigation onClick={closeDropdown}>floor plan</NavigationButton></li>
                        <li><NavigationButton nextPage={NOTIFICATION_MANAGER} direction={FORWARD} isRootNavigation onClick={closeDropdown}>manage notifications</NavigationButton></li>
                        <li><NavigationButton nextPage={OWN_RESERVATIONS} direction={FORWARD} isRootNavigation onClick={closeDropdown}>manage reservations</NavigationButton></li>
                        <li><NavigationButton nextPage={SETTINGS_MANAGER} direction={FORWARD} isRootNavigation onClick={closeDropdown}>settings</NavigationButton></li>
                        <li><button>about</button></li>
                        <li><button>logout</button></li>
                    </ul>
                </DropDown>
            </span>
        </div>
    );
}

export default Header;