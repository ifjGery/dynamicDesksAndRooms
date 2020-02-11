import { SAVE_MAP_STATE, UPDATE_SELECTABLE_STATE } from './constants';

export const saveMapState = (mapState) => ({
    type: SAVE_MAP_STATE,
    payload: {
        mapState
    }
});

export const updateReservableState = (id,reserved) => ({
    type: UPDATE_SELECTABLE_STATE,
    payload: {
        id,
        reserved
    }
})