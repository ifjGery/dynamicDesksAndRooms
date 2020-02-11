import { CREATE_FEEDBACK, UPDATE_FEEDBACK_REPLY, UPDATE_FEEDBACK_ID } from './constants';

export const createFeedback = feedback => ({
    type: CREATE_FEEDBACK,
    payload: {
        ...feedback
    }
})

export const updateFeedbackReply = feedback => ({
    type: UPDATE_FEEDBACK_REPLY,
    payload: {
        ...feedback
    }
})

export const updateFeedbackId = id => ({
    type: UPDATE_FEEDBACK_ID,
    payload: {
        id
    }
})