import 'core-js'
import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import configureStore from './store/configureStore';

const store = configureStore(rootReducer);

render(<Provider store = { store } >
            <App />
        </Provider> ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals