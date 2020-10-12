/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function env (appName) {
    let code = `

####################################################
# Server configuration
####################################################

VIYA_SERVER=
APPNAME=${appName}
# KEEPALIVE=YES
# TIMERS=600000
APPPORT=5000

###################################################
# tls support
##################################################

# HTTPS=TRUE
# TLS_CREATE=C:mcountry,ST:mystate,L:Cary,O:Myorg,OU:Mydept,CN:localhost


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