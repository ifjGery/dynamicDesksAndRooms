import React, { useState, createRef } from 'react';
import { useSelector } from 'react-redux';
import { WATCH_DISPLAY, RESERVE_DISPLAY, BACKWARD } from './constants';
import NavigationButton from './NavigationButton';
import useNavigation from '../containers/Navigation/useNavigation';
import useReservations from '../containers/Reservations/useReservations';
import useNotificationSettins from '../containers/NotificationSettings/useNotificationSettings';
import useUser from '../containers/User/useUser';

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

function Reserve({onChangeDisplay,selected}) {
    const [ fromDate, setFromDate ] = useState();
    const [ fromTime, setFromTime ] = useState();
    const [ toDate, setToDate ] = useState();
    const [ toTime, setToTime ] = useState();
    const { createReserved } = useReservations();
    const { user } = useUser();
    const reserve = () => {
        let currentTimestamp = new Date().getTime();
        let fromTimestamp = new Date(`${fromDate} ${fromTime}`).getTime();
        let toTimestamp = new Date(`${toDate} ${toTime}`).getTime();
        const reservation = {
            id: selected,
            floor: 1,
            timestamp: currentTimestamp,
            from: fromTimestamp,
            to: toTimestamp,
            contact: user.contact
        };
        console.log(reservation);
        createReserved(reservation);
        onChangeDisplay(null);
    }
    return (
        <>
        from: 
        <input type="date" onChange={e => setFromDate(e.target.value)}></input>
        <input type="time" onChange={e => setFromTime(e.target.value)}></input><br />
        till: 
        <input type="date" onChange={e => setToDate(e.target.value)}></input>
        <input type="time" onChange={e => setToTime(e.target.value)}></input><br />
        <button onClick={() => onChangeDisplay(null)}>back</button>
        <button onClick={reserve}>reserve</button>
        </>
    )
}

function Watch({onChangeDisplay, selected}) {
    const [ important, setImportant ] = useState(false);
    const [ reservation, setReservation ] = useState(false);
    const [ freeing, setFreeing ] = useState(false);
    const { createNotification } = useNotificationSettins();

    const watch = () => {
        const notification = {
            onId: selected,
            onFoor: 1,
            onFreed: freeing,
            onReserved: reservation,
            isImportant: important,
            timestamp: new Date().getTime()
        };
        console.log(notification);
        createNotification(notification);
        onChangeDisplay(null);
    };

    return (
        <>
        important <input type="checkbox" onChange={e => setImportant(e.target.checked)}></input><br />
        reservation <input type="checkbox" onChange={e => setReservation(e.target.checked)}></input><br />
        freeing <input type="checkbox" onChange={e => setFreeing(e.target.checked)}></input><br />
        <button onClick={() => onChangeDisplay(null)}>back</button>
        <button onClick={watch}>watch</button>
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
            display = <Watch onChangeDisplay={setActiveDisplay} selected={reservation.id} />;
            break;
        case RESERVE_DISPLAY:
            display = <Reserve onChangeDisplay={setActiveDisplay} selected={reservation.id} />;
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