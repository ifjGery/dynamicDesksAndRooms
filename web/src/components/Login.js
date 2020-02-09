import React, { useState } from 'react';

function Login({onSubmit, onClick}) {
    const [ nick, setNick ] = useState('');
    const [ contact, setContact ] = useState('');
    const submitHandler = e => {
        e.preventDefault();
        onSubmit({nick, contact});
    }

    return (
        <div className="login">
            <form onSubmit={submitHandler}>
                Nick: <input type="text" name="nick" value={nick} onChange={(e) => setNick(e.target.value)} /><br />
                Contact: <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} /><br />
                <button onClick={(e) => {submitHandler(e); onClick && onClick()}}>Login</button>
            </form>
        </div>
    );
}

export default Login;