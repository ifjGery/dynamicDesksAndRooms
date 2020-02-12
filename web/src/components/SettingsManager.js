import React, { useState } from 'react';
import { BACKWARD } from './constants';
import NavigationButton from './NavigationButton';
import useUser from '../containers/User/useUser';

function SettingsManager() {
    const { user, updateUser } = useUser();
    const [ settings, setSettings ] = useState(user);

    const onChange = e => setSettings({ [e.target.name] : e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        updateUser(settings);
    }

    return (
        <div className="settingsManager">
            <NavigationButton direction={BACKWARD}><span className="fontello icon-left-big"></span></NavigationButton><br />
            <form className="userSettings">
                <div><span>nick:</span><input value={settings.nick} type="input" name="nick" onChange={onChange} /></div>
                <div><span>contact:</span><input value={settings.contact} type="input" name="contact" onChange={onChange} /></div>
                <div><button onClick={onSubmit}>Save changes</button></div>
            </form>
        </div>
    )
}

export default SettingsManager;