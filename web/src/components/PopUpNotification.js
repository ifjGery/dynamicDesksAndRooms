import React, { useEffect, useState } from 'react';
import useNotifications from '../containers/Notifications/useNotifications';
import useNavigation from '../containers/Navigation/useNavigation';
import useFeedback from '../containers/Feedback/useFeedback';
import { RATE } from './constants';

function PopUpNotification() {
    const { importantNotifications } = useNotifications();
    const { changeWindow } = useNavigation();
    const { updateFeedbackId } = useFeedback();
    const [ activeNotification, setActiveNotification ] = useState(0);
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        setActiveNotification(importantNotifications.length ? importantNotifications.length - 1 : 0);
        setVisible(importantNotifications.length);
    }, [importantNotifications.length]);

    const next = () => {
        setActiveNotification(activeNotification < importantNotifications.length - 1 ? activeNotification + 1 : activeNotification );
    }

    const prev = () => {
        setActiveNotification(activeNotification > 0 ? activeNotification - 1 : 0);
    }

    const rateAction = () => {
        if (importantNotifications[activeNotification].rateable) {
            updateFeedbackId(importantNotifications[activeNotification].id);
            changeWindow(RATE);
        }
    }

    return visible && importantNotifications.length ? (
        <div className="popUpNotification">
            <div className="navigation">
                <button onClick={next}><span className="fontello icon-up-open"></span></button>
                <button onClick={prev}><span className="fontello icon-down-open"></span></button>
            </div>
            <div className="messageContainer">
                <button className="message" onClick={rateAction}>{importantNotifications[activeNotification].text}</button>
            </div>
            <div className="closeButton">
                <button onClick={() => setVisible(false)}><span className="fontello icon-cancel-circled"></span></button>
            </div>
        </div>
    ) : '';
}

export default PopUpNotification;