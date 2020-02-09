import React, { useState, createRef } from 'react';
import BackNavigation from '../containers/Navigation/BackNavigation';

function SettingsManager() {
    const [ settings, setSettings ] = useState({
            "nick": "Geri",
            "contact": "@Geri",
            "leftHended": true
        });

    const onChange = e => setSettings({ [e.target.name] : e.value });

    return (
        <div className="settingsManager">
            <BackNavigation /><br />
            <form>
                nick: <input value={settings.nick} type="input" name="nick" onChange={onChange} /><br />
                contact: <input value={settings.contact} type="input" name="contact" onChange={onChange} /><br />
                left handed: <input type="checkbox" checked={settings.leftHended} name="leftHanded" onChange={onChange} /><br />
                <input type="submit" value="Apply" />
            </form>
        </div>
    )
}

export default SettingsManager;