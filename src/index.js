import React from 'react';
const Firebase = require('firebase');
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import './index.css';

const store = configureStore({});

var config = {
  apiKey: "AIzaSyDLjoRUESHSPXzzNlj58WkEYszIQ4q3Pts",
  authDomain: "antonjokes.firebaseapp.com",
  databaseURL: "https://antonjokes.firebaseio.com",
  storageBucket: "antonjokes.appspot.com",
};
Firebase.initializeApp(config);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
