import React, { useState } from 'react';
import { BACKWARD, RESERVATION_PAGE } from './constants';
import NavigationButton from '../components/NavigationButton';
import useSearch from '../containers/Search/useSearch';
import useNavigation from '../containers/Navigation/useNavigation';

function List({finded,onClick}) {
    return (
        <>
        {
            finded.map(find => (
                <button onClick={() => onClick(find)}>
                    {find}
                </button>
            ))
        }
        </>
    )
}

function SearchList() {
    const { hits } = useSearch();
    const results = hits();
    const { navigateForward, changeSelected } = useNavigation();

    const navigateToReservation = id => {changeSelected(id); navigateForward(RESERVATION_PAGE)};

    const ThemedList = ({name, onClick, list}) => (
        <div className={"foundIn" + name}>
            <b>in {name}</b><br />
            <div className="hitList">
                <List onClick={onClick} finded={list} />
            </div>
        </div>
    );

    return (
        <div className="searchList">
            <NavigationButton direction={BACKWARD}><span className="fontello icon-left-big"></span></NavigationButton><br />
            <ThemedList name="Id" onClick={navigateToReservation} list={results.inId} />
            <ThemedList name="Name" onClick={navigateToReservation} list={results.inId} />
            <ThemedList name="Description" onClick={navigateToReservation} list={results.inId} />
            <ThemedList name="Equipment" onClick={navigateToReservation} list={results.inId} />
        </div>
    )
}

export default SearchList;