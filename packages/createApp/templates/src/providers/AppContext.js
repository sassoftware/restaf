/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function AppContext () {
    let code = `
        import React from 'react';
        const AppContext = React.createContext();
        export default AppContext;
    `;
    return code;
}