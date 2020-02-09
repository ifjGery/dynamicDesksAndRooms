import React, { useState, createRef } from 'react';
import BackNavigation from '../containers/Navigation/BackNavigation';

function AdvancedSearch() {
    return (
        <div className="advancedSearch">
            <BackNavigation /><br />
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