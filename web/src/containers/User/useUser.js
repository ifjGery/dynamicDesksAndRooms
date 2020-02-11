import { useSelector, useDispatch } from 'react-redux';
import { upadatUser as upadatUserAction } from './actions';
import Network from '../../websocket';

function useUser() {
    const net = new Network();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const updateUser = data => {
        user.nick === "" && net.login({nick: data.nick, contact: data.contact, onFloor:1});
        dispatch(upadatUserAction(data));
    }

    return {
        user,
        updateUser
    };
}

export default useUser;