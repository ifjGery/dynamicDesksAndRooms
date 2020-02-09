import React from 'react';
import { ADVANCED_SEARCH } from './constants';

import ForwardNavigation from '../containers/Navigation/ForwardNavigation';

function QuickSearch({onClick, onSearch}) {
    return (
        <div className="quickSearch">
            <input type="text"></input>
            <ForwardNavigation nextPage={ADVANCED_SEARCH} onClick={onClick}>Adv</ForwardNavigation>
        </div>
    );
}

export default QuickSearch;