import { useSelector, useDispatch } from 'react-redux';
import { 
    saveMapState as saveMapStateAction, 
    updateReservableState as updateReservableStateAction
} from './actions';

function useMap() {
    const dispatch = useDispatch();
    const mapState = useSelector(state => state.map);
    const saveMapState = data => dispatch(saveMapStateAction(data));
    const updateReservableState = (id, reserved) => dispatch(updateReservableStateAction(id, reserved));

    return {
        mapState,
        saveMapState,
        updateReservableState
    };
}

export default useMap;