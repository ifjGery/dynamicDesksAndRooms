import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

import Network from './websocket';

import reservables from './data.json';

import { createReserved, updateReserved } from './containers/Reservations/actions';
import { updateReservableState } from './containers/FloorPlan/actions';
import { createNotification } from './containers/Notifications/actions';

let ct = new Date();

const preloadedState = {
    navigation: {
        activeWindow: 'LOGIN'
    },
    reservable: reservables.reservable,
    reserved: [
    ],
    map: {
        zoom: 1,
        pan: {
            x:0,
            y:0
        },
        reserved: {}
    },
    notifications: [],
    notificationSettings: [
    ],
    user: {
        nick:'aaa',
        contact: 'bbbb',
    }
}

const net = new Network("ws://localhost:8080");

const store = createStore(reducers, preloadedState);

net.subscribe('reservation', data => {
    const {type, ...coreData} = data;
    store.dispatch(createReserved(coreData))
});

setInterval(() => {
    const state = store.getState();
    const currentTime = new Date().getTime();
    for(let index in state.reserved) {
        const one = state.reserved[index];
        const reservable = state.reservable['id_' + one.id];
        if (one.state === 'inactive') continue;
        if (one.state === 'scheduled' && currentTime > one.from && currentTime < one.to) {
            store.dispatch(updateReserved({selected: index,state:'reserved'}))
            store.dispatch(updateReservableState(one.id, true));

            state.notificationSettings.forEach(setting => {
                if(setting.onId === one.id && setting.onReserved) {
                    if(one.contact === state.user.contact) {
                        store.dispatch(createNotification({
                            id: reservable.id,
                            timestamp: currentTime,
                            text: `Your reservation started for ${reservable.id}`,
                            seen: false,
                            rateable: false,
                            isImportant: setting.isImportant
                        }));
                    } else {
                        store.dispatch(createNotification({
                            id: reservable.id,
                            timestamp: currentTime,
                            text: `Someones reservation started for ${reservable.id}`,
                            seen: false,
                            rateable: false,
                            isImportant: setting.isImportant
                        }));
                    }
                }
            });
        }
        else if(one.state === 'reserved' && currentTime > one.to) {
            store.dispatch(updateReserved({selected: index,state:'inactive'}))
            store.dispatch(updateReservableState(one.id, false));
            if (one.contact === state.user.contact) {
                store.dispatch(createNotification({
                    id: reservable.id,
                    timestamp: currentTime,
                    text: `How was your reservation for ${reservable.id}? Please rate it`,
                    seen: false,
                    rateable: true,
                    isImportant: true
                }));
            } else {
                state.notificationSettings.forEach(setting => {
                    if(setting.onId === one.id && setting.onFreed) {
                        store.dispatch(createNotification({
                            id: reservable.id,
                            timestamp: currentTime,
                            text: `Someones reservation ended for ${reservable.id}`,
                            seen: false,
                            rateable: false,
                            isImportant: setting.isImportant
                        }));
                    }
                });
            }
        }
    }

}, 1000 * 2); // 10 sec

//setTimeout(() => net.login({nick: '', contact: '', onFloor:1}), 1000);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);