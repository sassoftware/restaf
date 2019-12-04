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

// The following are set in the environment( externally and not thru env)
// Allow unauthorized:  NODE_TLS_REJECT_UNAUTHORIZED=0
// DisAllow unauthorized: NODE_TLS_REJECT_UNAUTHORIZED=1

let store = restaf.initStore({rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED});
store
  .logon(payload)
  .then(msg => {
    console.log(`Logon Status: ${msg}`);
    console.log("calling logoff");
    console.log(store.connection());
    return store.logoff();
  })
  .then(lmsg => console.log(lmsg))
  .catch(err => console.log(err));
