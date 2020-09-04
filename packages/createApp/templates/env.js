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
HTTPS=false
# APPHOST=localhost
APPPORT=5000
VIYA_SERVER=

# Enter the clientID that is registered for your app on your Viya server
# Make sure this is your new authorization_code.
# 
AUTHFLOW=code
CLIENTID=viyademo
CLIENTSECRET=secret

#
# TLS support
# file references below are sample paths
#

# HTTPS=true
# SAMESITE=None,secure

# Option 1: signed key and certificates
# TLS_KEY=../certs/self/key.pem
# TLS_CERT=../certs/self/certificate.pem

# Option 2: If you pfx form of certificate use this
# TLS_PFX=../certs/sascert/sascert2.pfx
# TLS_PW=rafdemo

# Optional ( can also be set in env)
# TLS_BUNDLE=../certs/self/ca-bundle.pem
# NODE_TLS_REJECT_UNAUTHORIZED=0

#################################################################
# Application Section
#################################################################
    `;
    return code;
};