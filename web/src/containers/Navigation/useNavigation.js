import { useSelector, useDispatch } from 'react-redux';
import { 
    navigateForward as navigateForwardAction,
    navigateBackward as navigateBackwardAction,
    changeWindow as changeWindowAction } from './actions';

function useUser() {
    const dispatch = useDispatch();
    const navigation = useSelector(state => state.navigation);
    const navigateForward = (newPage, isRootNavigation) => dispatch(navigateForwardAction(newPage, isRootNavigation));
    const navigateBackward = newPage => dispatch(navigateBackwardAction(newPage));
    const changeWindow = newWindow => dispatch(changeWindowAction(newWindow));

    return {
        navigation,
        navigateForward,
        navigateBackward,
        changeWindow
    };
}

export default useUser;

