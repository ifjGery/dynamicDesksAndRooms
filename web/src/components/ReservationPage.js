import React, { useState, createRef } from 'react';

function FeedbackList(props) {
    const feedbackList = props.feedbacks;
    const feedbacks = feedbackList.map((feedback) => (
            <li>
                star: {feedback.star}<br />
                feedback: {feedback.feedback}<br />
                {feedback.reply ? ("reply: " + feedback.reply + <br />) : ""}
            </li>
        )
    );  
    return (
        <ul>
            {feedbacks}
        </ul>
    )
}

function Details(props) {
    const reservation = props.reservation;
    return (
        <>
            description: {reservation.description}<br /> 
            equipment: {reservation.equipment.map((item) => item + " ")}
            <FeedbackList feedbacks={reservation.feedbacks} />
            <button>Watch</button>
            <button>...</button>
            <button>Reserve</button>
        </>
    );
}

function Reserve() {
    return (
        <>
        from: <input type="date"></input><br />
        till: <input type="date"></input><br />
        <button>back</button>
        <button>reserve</button>
        </>
    )
}

function Watch() {
    return (
        <>
        important <input type="checkbox"></input><br />
        reservation <input type="checkbox"></input><br />
        freeing <input type="checkbox"></input><br />
        <button>back</button>
        <button>watch</button>
        </>
    )
}

function ReservationPage() {
    const [ activeDisplay, setActiveDisplay ] = useState('WATCH_DISPLAY');
    const [ reservation, setReservation ] = useState({
        "id": 113,
        "name": null,
        "type": "desk",
        "equipment": [
            "lamp",
            "powercord"
        ],
        "description" : "this is a lovely desk near a window with great view",
        "feedbacks": [
            {
                "timestamp": 1581104175,
                "star": 3,
                "feedback": "it's okay, need a bit cleaning",
                "reply": "cleaned up"
            }
        ]
    });


    let display;

    switch(activeDisplay) {
        case 'WATCH_DISPLAY':
            display = <Watch />;
            break;
        case 'RESERVE_DISPLAY':
            display = <Reserve />;
            break;
        default:
            display = <Details reservation={reservation} />;
    }

    return (
        <div className="reservationPage">
            id: {reservation.id}<br />
            {reservation.name ? ("name: " + reservation.name + <br />) : ""}
            type: {reservation.type}<br />
            {display}
        </div>
    )
}

export default ReservationPage;