import React, { useState, createRef } from 'react';
import { BACKWARD, SEARCH_LIST } from './constants';
import NavigationButton from './NavigationButton';
import useSearch from '../containers/Search/useSearch';
import useNavigation from '../containers/Navigation/useNavigation';

function AdvancedSearch() {
    const { newSearch, search } = useSearch();
    const { navigateForward } = useNavigation();
    const [ text, setText ] = useState(search.text);
    const [ type, setType ] = useState(null);
    const [ seatsNeeded, setSeatsNeeded ] = useState(false);
    const [ seats, setSeats ] = useState(null);
    const [ isFree, setIsFree ] = useState(false);
    const submit = () => {
        newSearch({
            text,
            type: type,
            freeSeats: seatsNeeded ? seats : null,
            onLevel: 1,
            minimumRating: 0,
            isFree: isFree ? isFree : null
        })
        navigateForward(SEARCH_LIST);
    };
    return (
        <div className="advancedSearch">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton><br />
            text: <input value={text} onChange={e => setText(e.target.value)} type="input"></input><br />
            type: <select onChange={e => e.target.type !== 'dontCare' ? setType(e.target.type) : setType(null)}>
                <option value="dontCare">don't care</option>
                <option value="desk">desk</option>
                <option value="room">room</option>
            </select><br />
            number of seats: <input type="checkbox" onChange={e => setSeatsNeeded(e.target.checked)} /><input onChange={e => setSeats(e.target.value)} type="number" /><br />
            currently free: <input type="checkbox" onChange={e => setIsFree(e.target.checked)} /><br />
            <button onClick={submit}>search</button>
        </div>
    )
}

export default AdvancedSearch;