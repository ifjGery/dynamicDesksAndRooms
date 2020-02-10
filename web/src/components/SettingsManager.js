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
        console.log(settings);
        updateUser(settings);
    }

    return (
        <div className="settingsManager">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton><br />
            <form>
                nick: <input value={settings.nick} type="input" name="nick" onChange={onChange} /><br />
                contact: <input value={settings.contact} type="input" name="contact" onChange={onChange} /><br />
                <button onClick={onSubmit}>Apply</button>
            </form>
        </div>
    )
}

export default SettingsManager;