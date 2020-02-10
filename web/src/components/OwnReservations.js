import React, { useState } from 'react';
import { BACKWARD } from './constants';
import NavigationButton from './NavigationButton';

function Details({reservation, selected}) {
    const details = (
        <>
            reserved to: {reservation.from}<br />
            reserved to: {reservation.to}<br />
            <button>cancel</button><br />
            <button>resume</button>
        </>
    );
    return reservation.id === selected ? details : "";
}

function Reservation({reservation, selected, onSelected}) {
    return (
        <>
            <li key={"res_" + reservation.id}>
                <button onClick={() => onSelected(reservation.id)}>{reservation.type} {reservation.id}</button><br />
                <Details reservation={reservation} selected={selected} />
            </li>
        </>
    )
}

function OwnReservations() {
    const [ reservations, setReservations ] = useState([
        {
            id: 113,
            type: "desk",
            from: "1115",
            to: "2555"
        },
        {
            id: 115,
            type: "desk",
            from: "1125",
            to: "2533"
        },
    ]);
    const [ selectedReservation, setSelectedReservation] = useState(null);

    return (
        <div className="ownReservations">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton>
            <ul>
                {reservations.map(reservation => <Reservation reservation={reservation} selected={selectedReservation} onSelected={setSelectedReservation} />)}
            </ul>
        </div>
    )
}

export default OwnReservations;