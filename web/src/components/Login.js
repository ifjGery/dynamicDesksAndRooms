import React, { useState } from 'react';
import useUser from '../containers/User/useUser';
import useNavigation from '../containers/Navigation/useNavigation';

function Login() {
    const [ nick, setNick ] = useState('');
    const [ contact, setContact ] = useState('');
    const { updateUser } = useUser();
    const { changeWindow } = useNavigation();
    const submitHandler = e => {
        e.preventDefault();
        updateUser({nick, contact});
        changeWindow(null);
    }

    return (
        <div className="login withHooks">
            <form onSubmit={submitHandler}>
                <span>Nick:</span><input type="text" name="nick" value={nick} onChange={(e) => setNick(e.target.value)} /><br />
                <span>Contact:</span><input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} /><br />
                <button onClick={submitHandler}>Login</button>
            </form>
        </div>
    );
}

export default Login;