/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function App (appName) {
    let code = `
import React from "react";
import ItemsListViewer from './components/ItemsListViewer';

//
// To start at a different component change Hello to your startup component
//
function App (props) {

    const Hello = (props) => {
        let r = (
            <div>
                 <h1> Welcome to viyademo created with create-react-restaf-viya-app </h1>
                <h2> Setup for accessing SAS/Viya using restaf and restaflib</h2>
             
                <h2> AppContext </h2>
                <p> By default a react context named AppContext is created. Use it to get access to:</p>
                <ul>
                <li> store - restaf store </li>
                <li> appOptions - this is a js object of the form with store and all options obtained thru appenv route</li>
                </ul>

                <p>Below is a super-simple browser of list of items in files service using restaf. Change the service prop to reports or forms to try it out </p>

                <ItemsListViewer service='files'></ItemsListViewer>
            </div>
            
        );
        return r;
    };
    return <Hello />;
}
export default App;
        `;
    return code;
};