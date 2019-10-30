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

/* --------------------------------------------------------------------------------
 * Logon to the Viya server
 * ---------------------------------------------------------------------------------
 */
let restaf  = require("restaf");
let payload = require("./config")();
let fs      = require("fs");

// The following are set in the environment
// NODE_EXTRA_CA_CERTS=c:/public/env/pems/roots.pem or wherever your pem file is stored


/*
let pemFile = process.env.SSL_CERT_FILE;
console.log(pemFile);
console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
// console.log(`pemfile = ${pemFile}`);
let pem = (pemFile != null) ? fs.readFileSync(pemFile, 'utf8') : null;
*/

let pemFile = process.env.PEMFILE;

console.log(`NODE_TLS_REJECT_UNAUTHORIZED=${process.env.NODE_TLS_REJECT_UNAUTHORIZED}`);
console.log(`pemfile = ${pemFile}`);
let pem = (pemFile != null) ? fs.readFileSync(pemFile, 'utf8') : null;
let store = restaf.initStore({pem: pem});
store
  .logon(payload)
  .then(msg => {
    console.log(`Logon Status: ${msg}`);
    console.log("calling logoff");
    return store.logoff();
  })
  .then(lmsg => console.log(lmsg))
  .catch(err => console.log(err));
