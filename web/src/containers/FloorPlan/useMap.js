import { useSelector, useDispatch } from 'react-redux';
import { saveMapState as saveMapStateAction } from './actions';

function useMap() {
    const dispatch = useDispatch();
    const mapState = useSelector(state => state.map);
    const saveMapState = data => dispatch(saveMapStateAction(data));

    return {
        mapState,
        saveMapState
    };
}

export default useMap;