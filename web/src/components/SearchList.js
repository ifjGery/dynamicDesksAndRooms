import React, { useState } from 'react';
import { BACKWARD, RESERVATION_PAGE } from './constants';
import NavigationButton from '../components/NavigationButton';
import useSearch from '../containers/Search/useSearch';
import useNavigation from '../containers/Navigation/useNavigation';

function List({finded,onClick}) {
    return (
        <>
        {
            finded.map(find =>
                <li>
                    <button onClick={() => onClick(find)}>
                        {find}
                    </button>
                </li>
                )
        }
        </>
    )
}

function SearchList() {
    const { hits } = useSearch();
    const results = hits();
    const { navigateForward, changeSelected } = useNavigation();

    const navigateToReservation = id => {changeSelected(id); navigateForward(RESERVATION_PAGE)}

    return (
        <div className="searchList">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton><br />
            <div className="foundInId">
                in ID<br />
                <ul>
                    <List onClick={navigateToReservation} finded={results.inId} />
                </ul>
            </div>
            <div className="foundInName">
                in Name<br />
                <ul>
                    <List onClick={navigateToReservation} finded={results.inName} />
                </ul>
            </div>
            <div className="foundInDescription">
                in Description<br />
                <ul>
                    <List onClick={navigateToReservation} finded={results.inDescription} />
                </ul>
            </div>
            <div className="foundInEquipment">
                in Equipment<br />
                <ul>
                    <List onClick={navigateToReservation} finded={results.inEquipment} />
                </ul>
            </div>
            
        </div>
    )
}

export default SearchList;