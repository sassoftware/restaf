/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function env (appName) {
    let code = `
REACT_APP_TARGET=http://$APPHOST:$APPPORT
REACT_APP_APPNAME=$APPNAME
REACT_APP_VIYA_SERVER=$VIYA_SERVER
    `;
    return code;
}