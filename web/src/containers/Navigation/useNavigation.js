import { useSelector, useDispatch } from 'react-redux';
import { 
    navigateForward as navigateForwardAction,
    navigateBackward as navigateBackwardAction,
    changeWindow as changeWindowAction,
    changeSelection as changeSelectionAction
 } from './actions';

function useUser() {
    const dispatch = useDispatch();
    const navigation = useSelector(state => state.navigation);
    const navigateForward = (newPage, isRootNavigation) => dispatch(navigateForwardAction(newPage, isRootNavigation));
    const navigateBackward = newPage => dispatch(navigateBackwardAction(newPage));
    const changeWindow = newWindow => dispatch(changeWindowAction(newWindow));
    const changeSelected = newSelection => dispatch(changeSelectionAction(newSelection));

    return {
        navigation,
        navigateForward,
        navigateBackward,
        changeWindow,
        changeSelected
    };
}

export default useUser;

