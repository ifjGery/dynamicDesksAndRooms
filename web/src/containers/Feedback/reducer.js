import { CREATE_FEEDBACK, UPDATE_FEEDBACK_REPLY } from './constants';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_FEEDBACK: {
            const { id, ...feedback } = action.payload;
            return {
                ...state,
                ['id_' + id] : {
                    ...state['id_' + id],
                    feedbacks : state['id_' + id].feedbacks.concat([feedback])
                }
            }
            return state['id_' + id].feedbacks.concat([feedback]);
        }
        case UPDATE_FEEDBACK_REPLY: {
            const { id, reply, timestamp } = action.payload;
            return {
                ...state,
                ['id_' + id] : {
                    ...state['id_' + id],
                    feedbacks : state['id_' + id].feedbacks.map(feedback => {
                        if (feedback.timestamp === timestamp) feedback.reply = reply;
                        return feedback;
                    })
                }
            }
        }
        default:
            return state;
    }
}