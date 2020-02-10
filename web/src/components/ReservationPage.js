import React, { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import { WATCH_DISPLAY, RESERVE_DISPLAY, BACKWARD } from './constants';
import useNavigation from '../containers/Navigation/useNavigation';
import NavigationButton from './NavigationButton';

function FeedbackList({feedbacks}) {
    const feedbackList = feedbacks.map((feedback, index) => (
            <li key={"feedback_" + index}>
                star: {feedback.star}<br />
                feedback: {feedback.feedback}<br />
                {feedback.reply ? <>reply: {feedback.reply}<br /></> : ""}
            </li>
        )
    );  
    return (
        <ul>
            {feedbackList}
        </ul>
    )
}

function Details({onChangeDisplay, reservation}) {
    return (
        <>
            description: {reservation.description}<br /> 
            equipment: {reservation.equipment.map((item) => item + " ")}
            <FeedbackList feedbacks={reservation.feedbacks} />
            <button onClick={() => onChangeDisplay(WATCH_DISPLAY)}>Watch</button>
            <button onClick={() => onChangeDisplay(RESERVE_DISPLAY)}>Reserve</button>
        </>
    );
}

function Reserve({onChangeDisplay}) {
    return (
        <>
        from: <input type="date"></input><br />
        till: <input type="date"></input><br />
        <button onClick={() => onChangeDisplay(null)}>back</button>
        <button>reserve</button>
        </>
    )
}

function Watch({onChangeDisplay}) {
    return (
        <>
        important <input type="checkbox"></input><br />
        reservation <input type="checkbox"></input><br />
        freeing <input type="checkbox"></input><br />
        <button onClick={() => onChangeDisplay(null)}>back</button>
        <button>watch</button>
        </>
    )
}

function ReservationPage() {
    const [ activeDisplay, setActiveDisplay ] = useState(null);
    const { navigation } = useNavigation();
    const reservation = useSelector(state => state.reservable["id_" + navigation.activeSelection]);
    
    let display;

    switch(activeDisplay) {
        case WATCH_DISPLAY:
            display = <Watch onChangeDisplay={setActiveDisplay} />;
            break;
        case RESERVE_DISPLAY:
            display = <Reserve onChangeDisplay={setActiveDisplay} />;
            break;
        default:
            display = <Details reservation={reservation} onChangeDisplay={setActiveDisplay} />;
    }

    let name = reservation.name ? <>name: {reservation.name}<br /></> : "";

    return (
        <div className="reservationPage">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton><br />
            id: {reservation.id}<br />
            {name}
            type: {reservation.type}<br />
            {display}
        </div>
    )
}

export default ReservationPage;