import React, { useState } from 'react';
import useNavigation from '../containers/Navigation/useNavigation';
import useFeedback from '../containers/Feedback/useFeedback';

function Feedback() {
    const { changeWindow } = useNavigation();
    const { createFeedback, feedbackId } = useFeedback();
    const [ stars, setStarts ] = useState(5);
    const [ feedback, setfeedback ] = useState('');
    const rate = () => {
        const currentTime = new Date().getTime();
        createFeedback({
            id: feedbackId.id,
            timestamp: currentTime,
            star: stars,
            feedback,
            reply: null
        });
        changeWindow(null);
    }
    return (
        <>
            <input type="range" min="1" max="5" step="1" value={stars} onChange={(e) => setStarts(e.target.value)} /><br />
            feedback: <input type="text" value={feedback} onChange={(e) => setfeedback(e.target.value)} /><br />
            <button onClick={rate}>rate</button>
        </>
    )
}

export default Feedback;