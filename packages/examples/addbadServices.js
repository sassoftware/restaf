/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

"use strict";

let restaf  = require('@sassoftware/restaf');
let payload = require('./config')();
let restaflib = require('@sassoftware/restaflib');
let fs = require('fs');

let {print}   = restaflib;

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

let pemFile = process.env.SSL_CERT_FILE;
console.log(`pemfile = ${pemFile}`);
let pem = (pemFile != null) ? fs.readFileSync(pemFile, 'utf8') : null;
let rejectUnauth = (process.NODE_TLS_REJECT_UNAUTHORIZED != null) 
                    ? process.NODE_TLS_REJECT_UNAUTHORIZED : 0;
let store = restaf.initStore({pem: pem, rejectUnauthorized: rejectUnauth});

async function setup (payload, ...args) {
  let msg = await store.logon(payload);
  print.msg(`${msg}`, 'Logon Status');
  let {SASLogon}= await store.addServices(...args);

  // list current clients

  let users = await store.apiCall(SASLogon.links('authorization'));
  print.items(users, 'client data');
  print.links(users, 'client links');
  return true;
}

setup(payload, "SASLogon")
  .then(r => console.log(r))
  .catch(e => {
    console.log(JSON.stringify(e, null,4));
    print.object(e);
  });
