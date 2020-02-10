import React, { useState } from 'react';
import useUser from '../containers/User/useUser';

function Login() {
    const [ nick, setNick ] = useState('');
    const [ contact, setContact ] = useState('');
    const { user, updateUser } = useUser();
    const submitHandler = e => {
        e.preventDefault();
        updateUser({nick, contact});
    }

    return (
        <div className="login withHooks">
            <form onSubmit={submitHandler}>
                Nick: <input type="text" name="nick" value={nick} onChange={(e) => setNick(e.target.value)} /><br />
                Contact: <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} /><br />
                <button onClick={submitHandler}>Login</button>
            </form>
        </div>
    );
}

export default Login;