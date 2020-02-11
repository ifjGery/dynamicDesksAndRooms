import { NEW_SEARCH } from './constants';

export const newSearch = data => ({
    type: NEW_SEARCH,
    payload: {...data}
});