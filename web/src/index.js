import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { helloSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

ReactDOM.render(<App />, document.getElementById('root'));