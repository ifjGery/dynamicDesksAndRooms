import { USER_UPDATE } from './constants';

export const upadatUser = (userData) => ({
    type: USER_UPDATE,
    payload: {
        ...userData
    }
});