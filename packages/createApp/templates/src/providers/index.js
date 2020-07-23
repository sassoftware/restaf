/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function index () {
    let code = `
        import AppContext from './AppContext';
        import AppProvider from './AppProvider';
        import withAppContext from './withAppContext';
        import setupViya from './setupViya';

        export {
            AppContext,
            AppProvider,
            withAppContext,
            setupViya
        };
    `;
    return code;

}