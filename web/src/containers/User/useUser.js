import { useSelector, useDispatch } from 'react-redux';
import { upadatUser as upadatUserAction } from './actions';

function useUser() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const updateUser = data => dispatch(upadatUserAction(data));

    return {
        user,
        updateUser
    };
}

export default useUser;