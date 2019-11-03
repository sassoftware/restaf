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

// must be set prior to start of app: NODE_EXTRA_CA_CERTS='c:/public/env/pems/roots.pem';
// https://github.com/nodejs/node/issues/20432

/* --------------------------------------------------------------------------------
 * Logon to the Viya server
 * ---------------------------------------------------------------------------------
 */
let restaf  = require("restaf");
let payload = require("./config")();
let fs      = require("fs");

let store = restaf.initStore();
store
  .logon(payload)
  .then(msg => {
    console.log(`Logon Status: ${msg}`);
    console.log("calling logoff");
    return store.logoff();
  })
  .then(lmsg => console.log(lmsg))
  .catch(err => console.log(err));
