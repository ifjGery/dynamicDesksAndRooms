import { useSelector, useDispatch } from 'react-redux';
import {
    createReserved as createReservedAction,
    updateReserved as updateReservedAction,
    deleteReserved as deleteReservedAction
} from './actions';

import Network from '../../websocket';

function useReservations() {
    const net = new Network();

    const dispatch = useDispatch();
    const allReservations = useSelector(state => {
        return state.reserved
    });
    const userReservations = user => {
        return allReservations.filter(reservation => reservation.contact === user);
    }
    const createReserved = data => {
        dispatch(createReservedAction(data));
        net.broadcast({type: 'reservation', ...data});
    };
    const updateReserved = data => dispatch(updateReservedAction(data));
    const deleteReserved = data => dispatch(deleteReservedAction(data));

    return {
        allReservations,
        userReservations,
        createReserved,
        updateReserved,
        deleteReserved
    }
}

export default useReservations;