import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { configureStore } from './store/index'
import { Provider } from 'react-redux'
import {auth} from './store/authReducer'
import ReactGA from 'react-ga';
//GA 초기화
ReactGA.initialize('UA-141177463-1');//추적 id 복붙



var config = {
    apiKey: "AIzaSyDtMrV1aKi30GAtpRRLFupjcaGk3AQQhp0",
    authDomain: "react-board-60426.firebaseapp.com",
    databaseURL: "https://react-board-60426.firebaseio.com",
    projectId: "react-board-60426",
    storageBucket: "react-board-60426.appspot.com",
    messagingSenderId: "543250085061",
    appId: "1:543250085061:web:8ba82eb8024111b5"
  };
//firebase 초기화
firebase.initializeApp(config);

const store = configureStore();

store.dispatch(auth());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
