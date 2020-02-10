import React, { useState } from 'react';
import DropDown from './DropDown';

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

function Header() {
    const [activeDropDown, setActiveDropDown] = useState(null);
    return (
        <div className="header">
            <span>
                <button 
                        onClick={() => activeDropDown === NOTIFICATION ? setActiveDropDown(null) : setActiveDropDown(NOTIFICATION)}
                        className={"header_button " + (activeDropDown === NOTIFICATION ? "selected" : "")}>
                    !
                </button>
                {
                    activeDropDown === NOTIFICATION &&
                    <DropDown>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                        </ul>
                    </DropDown>
                }
            </span>
            <span>
                <button
                        onClick={() => activeDropDown === FLOOR_SELECTOR ? setActiveDropDown(null) : setActiveDropDown(FLOOR_SELECTOR)}
                        className={"header_button " + (activeDropDown === FLOOR_SELECTOR ? "selected" : "")}>
                    L1
                </button>
                {
                    activeDropDown === FLOOR_SELECTOR &&
                    <FloorSelector />
                }
            </span>
            <span className="spacer"></span>
            <span>
                <button
                        onClick={() => activeDropDown === QUICK_SEARCH ? setActiveDropDown(null) : setActiveDropDown(QUICK_SEARCH)}
                        className={"header_button " + (activeDropDown === QUICK_SEARCH ? "selected" : "")}>
                    S
                </button>
                {
                    activeDropDown === QUICK_SEARCH &&
                    <QuickSearch onClick={setActiveDropDown} />
                }
            </span>
            <span>
                <button
                        onClick={() => activeDropDown === MENU ? setActiveDropDown(null) : setActiveDropDown(MENU)}
                        className={"header_button " + (activeDropDown === MENU ? "selected" : "")}>
                    =
                </button>
                {
                    activeDropDown === MENU &&
                    <DropDown>
                        <ul>
                            <li><NavigationButton nextPage={null} direction={FORWARD} isRootNavigation>floor plan</NavigationButton></li>
                            <li><NavigationButton nextPage={NOTIFICATION_MANAGER} direction={FORWARD} isRootNavigation>manage notifications</NavigationButton></li>
                            <li><NavigationButton nextPage={OWN_RESERVATIONS} direction={FORWARD} isRootNavigation>manage reservations</NavigationButton></li>
                            <li><NavigationButton nextPage={SETTINGS_MANAGER} direction={FORWARD} isRootNavigation>settings</NavigationButton></li>
                            <li><button>about</button></li>
                            <li><button>logout</button></li>
                        </ul>
                    </DropDown>
                }
            </span>
        </div>
    );
}

export default Header;