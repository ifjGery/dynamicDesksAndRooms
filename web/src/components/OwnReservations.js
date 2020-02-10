import React, { useState, useEffect } from 'react';
import { BACKWARD } from './constants';
import NavigationButton from './NavigationButton';
import useReservations from '../containers/Reservations/useReservations';
import useUser from '../containers/User/useUser';

function Details({reservation, selected, index, onDelete}) {
    const toDate = timestamp => {
        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    }
    const details = (
        <>
            reserved from: {toDate(reservation.from)}<br />
            reserved to: {toDate(reservation.to)}<br />
            <button onClick={() => onDelete(reservation)}>cancel</button>
        </>
    );
    return index === selected ? details : "";
}

function Reservation({reservation, selected, onSelected, index, onDelete}) {
    return (
        <>
            <li key={"res_" + reservation.id}>
                <button onClick={() => onSelected(index)}>{reservation.type} {reservation.id}</button><br />
                <Details reservation={reservation} selected={selected} index={index} onDelete={onDelete} />
            </li>
        </>
    )
}

function OwnReservations() {
    const { user } = useUser();
    const { userReservations, deleteReserved } = useReservations();
    const reservations = userReservations(user.contact);
    const [ selectedReservation, setSelectedReservation] = useState(null);

    return (
        <div className="ownReservations">
            <NavigationButton direction={BACKWARD}>Back</NavigationButton>
            <ul>
                {reservations.map((reservation, index) => <Reservation reservation={reservation} index={index} selected={selectedReservation} onSelected={setSelectedReservation} onDelete={deleteReserved} />)}
            </ul>
        </div>
    )
}

export default OwnReservations;