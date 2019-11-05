import React from 'react';
import ReactDOM from 'react-dom';
import restaf from 'restaf';
import setupViya from './lib/setupViya';
import {AppProvider} from './providers';
import './index.css';
import App from './App';
//import * as serviceWorker from 'serviceWorker';

// eslint-disable-next-line no-unused-vars
const $ = window.$;
let appEnv = window.optUI.appEnv;
debugger;
let store = restaf.initStore();
debugger;
setupViya(store, appEnv, window.optUI.logonPayload)  
    .then ((r) => {
        ReactDOM.render(
            <AppProvider value={{store: store, viya: r}}>  
                <App />     
            </AppProvider>
        , document.querySelector('#root'));
    })
    .catch(err => console.log(JSON.stringify(err, null, 4)))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


