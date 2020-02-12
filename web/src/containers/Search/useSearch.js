import { useSelector, useDispatch } from 'react-redux';
import {
    newSearch as newSearchAction
} from './actions';

function useSearch() {
    const dispatch = useDispatch();

    const search = useSelector(state => state.search);
    const newSearch = data => dispatch(newSearchAction(data));

    const allReservable = useSelector(state => state.reservable);
    const allReserved = useSelector(state => state.reserved);

    const hits = () => {
        let result = {
            inName : [],
            inId : [],
            inDescription : [],
            inEquipment : []
        }

        const filtered = Object.entries(allReservable).map(entry => entry[1]).filter(one => {
            console.log(search);
            let currentTime = new Date().getTime();
            let good = true;
            if(search.type) good = good && (search.type === one.type);
            if(search.minimumSeats) good = good && (search.minimumSeats <= one.seats);
            if(search.isFree) good = good && allReserved.reduce((prev, curr) => {
                return prev && (
                    curr.id !== one.id ||
                    (curr.state !== 'inactive' &&
                    (currentTime < curr.from || currentTime > curr.to))
                );
            },true);
            return good;
        })

        for(let index in filtered) {
            const one = filtered[index];
            if (String(one.id).search(search.text) !== -1) result.inId.push(one.id);
            if (one.name && one.name.search(search.text) !== -1) result.inName.push(one.id);
            if (one.equipment.join('').search(search.text) !== -1) result.inEquipment.push(one.id);
            if (one.description.search(search.text) !== -1) result.inDescription.push(one.id);
        }

        return result;
    };

    return {
        search,
        hits,
        newSearch
    }
}

export default useSearch;