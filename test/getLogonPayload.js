/*
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let getToken = require('./getToken.js');
let debug = require('debug');
const log = debug('logonpayload');
module.exports = async function getLogonPayload() {
 
  if (process.env.USEPASSWORD === 'TRUE') {
    let logonPayload = {
        host: process.env.VIYA_SERVER,
        authType: 'password',
        user: process.env.VIYA_USER,
        password: process.env.VIYA_PASSWORD,
        clientID: process.env.VIYA_CLIENTID,
        clientSecret: process.env.VIYA_CLIENTSECRET
      };
      
    return logonPayload;
  }

  // need more configuration and code changes(mounting .sas folder) to make this work in docker

  try {
    let {host, token} = await getToken();
    let logonPayload = {
      host: host,
      authType: 'server',
      token: token,
      tokenType: 'Bearer'
    };
    return logonPayload;
  } catch (e) {
    log('Error getting token: ', e);
    process.exit(1);
  }

}