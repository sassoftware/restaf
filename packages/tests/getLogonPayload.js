/*
 * Copyright © 2025, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let getToken = require('./getToken.js');
module.exports = async function getLogonPayload() {
 
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
    console.log('Error getting token: ', e);
    process.exit(1);
  }

}
