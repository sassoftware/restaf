/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
let sh = require('shelljs');
module.exports = createReactApp = (appName) => {
    return new Promise((resolve) => {
        console.log('Running create-react-app');
        sh.exec(`npx create-react-app ${appName}`, () => {
            console.log('Created react app');
            resolve(true);
        }); 
	});
};
