/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function index () {
    let code = `
        import React from 'react';
        import ReactDOM from 'react-dom';
        import {setupViya, AppProvider} from './providers';
        import App from './App';
        //import * as serviceWorker from 'serviceWorker';

       
        setupViya()
        .then ( (r) => {
            ReactDOM.render(
            <AppProvider value={r}>
                <App />
            </AppProvider>
            , document.querySelector('#root'));
        })
        .catch(err => console.log(JSON.stringify(err, null, 4)))

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        // serviceWorker.unregister();
    
    `;
    return code;
}