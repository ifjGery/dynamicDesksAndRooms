import React from 'react';
import { ADVANCED_SEARCH, FORWARD } from './constants';
import NavigationButton from './NavigationButton';

function QuickSearch({onClick}) {
    return (
        <div className="quickSearch">
            <input type="text"></input>
            <NavigationButton nextPage={ADVANCED_SEARCH} direction={FORWARD} isRootNavigation onClick={onClick}>Adv</NavigationButton>
        </div>
    );
}

export default QuickSearch;