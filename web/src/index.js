import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';

import { LOGIN } from './components/constants';

import reservables from './data.json';

const preloadedState = {
    navigation: {
        activeWindow: null
    },
    reservable: reservables.reservable
}

const store = createStore(reducers, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);