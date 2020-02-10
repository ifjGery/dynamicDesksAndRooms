import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

import Network from './websocket';

import reservables from './data.json';

import { createReserved } from './containers/Reservations/actions';

const preloadedState = {
    navigation: {
        activeWindow: null
    },
    reservable: reservables.reservable,
    reserved: []
}

const net = new Network("ws://localhost:8080");

const store = createStore(reducers, preloadedState);

net.subscribe('reservation', data => {
    const {type, ...coreData} = data;
    store.dispatch(createReserved(coreData))
});

setTimeout(() => net.login({nick: '', contact: '', onFloor:1}), 1000);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);