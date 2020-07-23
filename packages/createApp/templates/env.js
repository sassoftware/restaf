/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function env (appName) {
    let code = `
####################################################
# Server configuration
####################################################

APPNAME=${appName}
# Note: See package.json script tag for how APPENTRY and APPLOC is being set
# to facilate switching between public/dev.html and build/index.html
# APPENTRY=index.html
APPLOC=
APPHOST=localhost
APPPORT=5000
VIYA_SERVER=
AUTHFLOW=code
# Enter the clientID that is registered for your app on your Viya server
# Make sure this is your new authorization_code.
# 
CLIENTID=viyademo
CLIENTSECRET=secret
#################################################################
# Application Section
#################################################################
    `;
    return code;
}