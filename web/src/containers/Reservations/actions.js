import { CREATE_RESERVED, UPDATE_RESERVED, DELETE_RESERVED } from './constants';

export const createReserved = data => ({
    type: CREATE_RESERVED,
    payload: {...data}
});

export const updateReserved = data => ({
    type: UPDATE_RESERVED,
    payload: {...data}
});

export const deleteReserved = data => ({
    type: DELETE_RESERVED,
    payload: {...data}
});