import React from 'react';
import { ADVANCED_SEARCH, FORWARD } from './constants';
import NavigationButton from './NavigationButton';

function QuickSearch({onClick, onSearch}) {
    return (
        <div className="quickSearch">
            <input type="text"></input>
            <NavigationButton nextPage={ADVANCED_SEARCH} direction={FORWARD} isRootNavigation>Adv</NavigationButton>
        </div>
    );
}

export default QuickSearch;