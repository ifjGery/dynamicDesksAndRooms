import React, { useState } from 'react';
import useNavigation from '../containers/Navigation/useNavigation';
import useFeedback from '../containers/Feedback/useFeedback';

function Feedback() {
    const { changeWindow } = useNavigation();
    const { createFeedback, feedbackId } = useFeedback();
    const [ stars, setStars ] = useState(5);
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
        <div className="feedbackContent">
            <div className="stars">
                <button onClick={() => setStars(1)}><span className={stars >= 1 ? "icon-star" : "icon-star-empty"}></span></button>
                <button onClick={() => setStars(2)}><span className={stars >= 2 ? "icon-star" : "icon-star-empty"}></span></button>
                <button onClick={() => setStars(3)}><span className={stars >= 3 ? "icon-star" : "icon-star-empty"}></span></button>
                <button onClick={() => setStars(4)}><span className={stars >= 4 ? "icon-star" : "icon-star-empty"}></span></button>
                <button onClick={() => setStars(5)}><span className={stars >= 5 ? "icon-star" : "icon-star-empty"}></span></button>
            </div><br />
            <b>feedback:</b><br />
            <input type="text" value={feedback} onChange={(e) => setfeedback(e.target.value)} /><br />
            <button className="navButton" onClick={rate}>rate</button>
        </div>
    )
}

export default Feedback;