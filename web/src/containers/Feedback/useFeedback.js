import { useSelector, useDispatch } from 'react-redux';
import { 
    updateFeedbackId as updateFeedbackIdAction,
    createFeedback as createFeedbackAction
} from './actions';

function useSearch() {
    const dispatch = useDispatch();

    const feedbackId = useSelector(state => state.feedbackId);
    const updateFeedbackId = id => dispatch(updateFeedbackIdAction(id));
    const createFeedback = data => dispatch(createFeedbackAction(data));

    return {
        feedbackId,
        updateFeedbackId,
        createFeedback
    }
}

export default useSearch;