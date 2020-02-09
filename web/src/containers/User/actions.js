import { USER_LOGIN } from './constants';

export const loginUser = (userData) => ({
    type: USER_LOGIN,
    payload: {
        ...userData
    }
});