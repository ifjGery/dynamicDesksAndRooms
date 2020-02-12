import React, { useState } from 'react';
import { ADVANCED_SEARCH, FORWARD, SEARCH_LIST } from './constants';
import NavigationButton from './NavigationButton';
import useSearch from '../containers/Search/useSearch';

function QuickSearch({onClick}) {
    const { newSearch } = useSearch();
    const [ searchText, setSearchText ] = useState();

    const createNewSearch = () => {
        newSearch({
            text: searchText,
            type: null,
            freeSeats: null,
            onLevel: 1,
            minimumRating: 0,
            isFree: null
        })
    };
    return (
        <div className="quickSearch">
            <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text"></input>
            <NavigationButton 
                nextPage={SEARCH_LIST} 
                direction={FORWARD} 
                isRootNavigation 
                onClick={() => { createNewSearch(); onClick();}}><span className="fontello icon-search"></span></NavigationButton>
            <NavigationButton nextPage={ADVANCED_SEARCH} direction={FORWARD} isRootNavigation onClick={onClick}><span className="fontello icon-sliders"></span></NavigationButton>
        </div>
    );
}

export default QuickSearch;