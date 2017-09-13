import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

var thunkMiddleware = function ({ dispatch, getState }) {
    console.log('Enter thunkMiddleware');
    return function(next) {
        console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            console.log('thunkMiddleware action received>>>:', action)
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
