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
        console.log('a1');
        console.log(importantNotifications);
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
            <button onClick={next}>Up</button>
            <button onClick={prev}>Down</button>
            <button onClick={rateAction}>{importantNotifications[activeNotification].text}</button>
            <button onClick={() => setVisible(false)}>Close</button>
        </div>
    ) : '';
}

export default PopUpNotification;