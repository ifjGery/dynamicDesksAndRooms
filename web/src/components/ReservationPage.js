import React, { useState, createRef, useEffect } from 'react';
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
                <b>star:</b> {feedback.star}<br />
                <b>feedback:</b>
                <div className="info">{feedback.feedback}</div>
                {feedback.reply ? <><b>reply:</b><div className="info">{feedback.reply}</div></> : ""}
            </li>
        )
    );  
    return (
        <ul className="feedbacks">
            {feedbackList}
        </ul>
    )
}

function Details({onChangeDisplay, reservation}) {
    return (
        <>
            <b>description:</b>
                <div class="info">{reservation.description}</div>
            <b>equipment:</b> 
            <div class="info">{reservation.equipment.map((item) => item + " ")}</div>
            <div className="actionButtons">
                <button onClick={() => onChangeDisplay(WATCH_DISPLAY)}>Watch</button>
                <button onClick={() => onChangeDisplay(RESERVE_DISPLAY)}>Reserve</button>
            </div>
            <b>Feedbacks:</b>
            <FeedbackList feedbacks={reservation.feedbacks} />
        </>
    );
}

function Reserve({onChangeDisplay,selected}) {
    const [ fromDate, setFromDate ] = useState();
    const [ fromTime, setFromTime ] = useState();
    const [ toDate, setToDate ] = useState();
    const [ toTime, setToTime ] = useState();
    const { createReserved, nameReservations } = useReservations();
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
        createReserved(reservation);
        onChangeDisplay(null);
    }

    const convert = date => {
        let current = date.toJSON().split('T');
        current[1] = current[1].split(':').slice(0,2).join(':');
        return current;
    }

    const toDisplay = timestamp => {
        let disp = convert(new Date(timestamp));
        return `${disp[0]} ${disp[1]}`
    }

    useEffect(() => {
        let date = new Date();
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        const current = convert(date);
        date.setHours(date.getHours() + 1);
        const future = convert(date);

        setFromDate(current[0]);
        setFromTime(current[1]);
        
        setToDate(future[0]);
        setToTime(future[1]);
    }, []);

    return (
        <div className="reservation">
            <div>
                <b>from:</b> 
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}></input>
                <input type="time" value={fromTime} onChange={e => setFromTime(e.target.value)}></input><br />
            </div>
            <div>
            <b>till:</b> 
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}></input>
                <input type="time" value={toTime} onChange={e => setToTime(e.target.value)}></input><br />
            </div>
            <div className="actionButtons">
                <button onClick={() => onChangeDisplay(null)}>back</button>
                <button onClick={reserve}>reserve</button>
            </div>
            <div className="currentReservations">
                <b>Reservations:</b><br />
                <ul>
                    {nameReservations(selected).map(one => (
                        <li>
                            <span><b>from:</b>{toDisplay(one.from)}</span><br />
                            <span><b>to:</b>{toDisplay(one.to)}</span><br />
                            <span><b>by:</b>{one.contact}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
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
        createNotification(notification);
        onChangeDisplay(null);
    };

    return (
        <>
        <b>Watch settings</b>
        <div className="settings">
            <div><span>important</span> <input type="checkbox" onChange={e => setImportant(e.target.checked)}></input></div>
            <div><span>reservation</span> <input type="checkbox" onChange={e => setReservation(e.target.checked)}></input></div>
            <div><span>freeing</span> <input type="checkbox" onChange={e => setFreeing(e.target.checked)}></input></div>
        </div>
        <div className="actionButtons">
            <button onClick={() => onChangeDisplay(null)}>back</button><br />
            <button onClick={watch}>watch</button>
        </div>
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

    let name = reservation.name ? <><b>name:</b> {reservation.name}<br /></> : "";

    return (
        <div className="reservationPage">
            <NavigationButton direction={BACKWARD}><span className="fontello icon-left-big"></span></NavigationButton><br />
            <div><b>id:</b> {reservation.id}<br /></div>
            <div>{name}</div>
            <div><b>type:</b> {reservation.type}<br /></div>
            <div>{display}</div>
        </div>
    )
}

export default ReservationPage;