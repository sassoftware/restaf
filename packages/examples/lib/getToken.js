
/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Recommend using viya-cli to setup token 
 */
module.exports = function getToken(){
  let fs = require('fs');
  let j = fs.readFileSync(process.env.SASTOKEN, 'utf8');
  let js = JSON.parse(j);
  let token = js.Default['access-token'];
  return token;
}
