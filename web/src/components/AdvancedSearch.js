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
    const [ seats, setSeats ] = useState(null);
    const [ isFree, setIsFree ] = useState(false);
    const submit = () => {
        newSearch({
            text,
            type: type,
            minimumSeats: seats > 0 ? seats : null,
            onLevel: 1,
            minimumRating: 0,
            isFree: isFree ? isFree : null
        })
        navigateForward(SEARCH_LIST);
    };
    return (
        <div className="advancedSearch">
            <NavigationButton direction={BACKWARD}><span className="fontello icon-left-big"></span></NavigationButton><br />
            <div className="wrapper">
                <div className="settings">
                    <div><b>text:</b> <input className="width50p" value={text} onChange={e => setText(e.target.value)} type="input"></input></div>
                    <div><b>type:</b> <select className="width50p" onChange={e => e.target.type !== 'dontCare' ? setType(e.target.type) : setType(null)}>
                        <option value="dontCare">don't care</option>
                        <option value="desk">desk</option>
                        <option value="room">room</option>
                    </select></div>
                    <div><b>number of seats:</b> <input className="width50p" onChange={e => setSeats(e.target.value)} type="number" /></div>
                    <div><b>currently free:</b> <input className="width50p" type="checkbox" onChange={e => setIsFree(e.target.checked)} /></div>
                </div>
                <div class="actionButtons">
                    <button onClick={submit}>search <span className="fontello icon-search"></span></button>
                </div>
            </div>
        </div>
    )
}

export default AdvancedSearch;