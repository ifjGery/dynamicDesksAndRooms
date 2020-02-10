import {LOGIN_USER} from './constants';

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: {...user}
})