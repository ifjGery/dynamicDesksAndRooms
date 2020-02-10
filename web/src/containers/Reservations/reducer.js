import { CREATE_RESERVED, UPDATE_RESERVED, DELETE_RESERVED } from './constants';

const initialState = [];

export default function(state = initialState, action) {
    const data = action.payload;
    switch(action.type) {
        case CREATE_RESERVED: {
            return state.concat([{...data}]);
        }
        case UPDATE_RESERVED: {
            let newState = [];
            state.map((reserved, index) => {
                if (index === data.selected) {
                    let { selected, ...coreData} = data;
                    newState = newState.concat([
                        {
                            ...reserved,
                            ...coreData
                        }
                    ]);
                } else {
                    newState = newState.concat([reserved]);
                }
            })
            return newState;
        }
        case DELETE_RESERVED: {
            let newState = [];
            state.map(reserved => {
                if (reserved.timestamp !== data.timestamp ||
                    reserved.id !== data.id) {
                    newState = newState.concat([reserved]);
                }
            });
            return newState;
        }
        default:
            return state;
    }
}