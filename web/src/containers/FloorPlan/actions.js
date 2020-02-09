import { SAVE_MAP_STATE } from './constants';

export const saveMapState = (mapState) => ({
    type: SAVE_MAP_STATE,
    payload: {
        mapState
    }
});