import React, { useState } from 'react';
import DropDown from './DropDown';

import FloorSelector from './FloorSelector';
import QuickSearch from './QuickSearch';

import ForwardNavigation from '../containers/Navigation/ForwardNavigation';

import {
    NOTIFICATION_MANAGER,
    SETTINGS_MANAGER,
    OWN_RESERVATIONS,
    NOTIFICATION,
    FLOOR_SELECTOR,
    QUICK_SEARCH,
    MENU
} from './constants';

function Header() {
    const [activeDropDown, setActiveDropDown] = useState(null);
    const closeDropdown = () => setActiveDropDown(null);
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
                    <FloorSelector onClick={closeDropdown} />
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
                            <li><ForwardNavigation nextPage={null} onClick={closeDropdown} isRootNavigation>floor plan</ForwardNavigation></li>
                            <li><ForwardNavigation nextPage={NOTIFICATION_MANAGER} onClick={closeDropdown} isRootNavigation>manage notifications</ForwardNavigation></li>
                            <li><ForwardNavigation nextPage={OWN_RESERVATIONS} onClick={closeDropdown} isRootNavigation>manage reservations</ForwardNavigation></li>
                            <li><ForwardNavigation nextPage={SETTINGS_MANAGER} onClick={closeDropdown} isRootNavigation>settings</ForwardNavigation></li>
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