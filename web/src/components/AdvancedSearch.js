import React, { useState, createRef } from 'react';
import { BACKWARD } from './constants';
import NavigationButton from './NavigationButton';

function AdvancedSearch() {
    return (
        <div className="advancedSearch">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton><br />
            name: <input type="input"></input><br />
            all level: <input type="checkbox"></input><br />
            number of seats: <input type="number"></input><br />
            currently free: <input type="checkbox"></input><br />
            reservation time: <input type="number"></input><br />
            <button>search</button>
        </div>
    )
}

export default AdvancedSearch;