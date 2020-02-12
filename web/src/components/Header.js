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
        <div>
            <span className="small color-gray">{`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`}</span><br />
            <p>{notification.text}</p>
        </div>
    );
}

function NotificationList({notifications, markRead}) {
    const markAll = () => notifications.map(one => markRead(one));
    return (
        <div className="notificationList">
            <button onClick={markAll}>Mark All Readed</button>
            <ul>
                {notifications.map(notification => (
                    <li className="notification"><Notification notification={notification} /></li>
                )).reverse()}
            </ul>
        </div>
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
    const DropButton = ({dropDown, children, onClick, isInactive}) => (
        <button onClick={() => !Boolean(isInactive) && dropDownSelector(dropDown)} className={"header_button " + isSelected(dropDown) + (isInactive ? ' inactiveFeature' : '')}>
            {children}
        </button>
    );

    return (
        <div className="header">
            <span>
                <DropButton dropDown={NOTIFICATION}><span className="fontello icon-bell-alt"></span>{ unread > 0 && <span className="unreadIcon">{unread ? unread : ''}</span>}</DropButton>
                <DropDown visible={activeDropDown === NOTIFICATION}>
                    <NotificationList notifications={notifications} markRead={readNotification} />
                </DropDown>
            </span>

            <span>
                <DropButton dropDown={FLOOR_SELECTOR} onClick isInactive={true}><span className="fontello icon-sitemap"></span></DropButton>
                {
                    activeDropDown === FLOOR_SELECTOR &&
                    <FloorSelector />
                }
            </span>

            <span className="spacer"></span>

            <span>
                <DropButton dropDown={QUICK_SEARCH}><span className="fontello icon-search"></span></DropButton>
                {
                    activeDropDown === QUICK_SEARCH &&
                    <QuickSearch onClick={closeDropdown} />
                }
            </span>

            <span>
                <DropButton dropDown={MENU}><span className="fontello icon-menu"></span></DropButton>
                <DropDown visible={activeDropDown === MENU}>
                    <ul className="menu">
                        <li><NavigationButton nextPage={null} direction={FORWARD} isRootNavigation onClick={closeDropdown}>Map</NavigationButton></li>
                        <li><NavigationButton nextPage={NOTIFICATION_MANAGER} direction={FORWARD} isRootNavigation onClick={closeDropdown}>Notification manager</NavigationButton></li>
                        <li><NavigationButton nextPage={OWN_RESERVATIONS} direction={FORWARD} isRootNavigation onClick={closeDropdown}>Reservation manager</NavigationButton></li>
                        <li><NavigationButton nextPage={SETTINGS_MANAGER} direction={FORWARD} isRootNavigation onClick={closeDropdown}>Settings</NavigationButton></li>
                        <li><button>logout</button></li>
                    </ul>
                </DropDown>
            </span>
        </div>
    );
}

export default Header;