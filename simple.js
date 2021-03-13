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
let restaf = require('@sassoftware/restaf');
let config = require('./config');
let payload  = config();
let store = restaf.initStore();

payload.keepAlive = null;
store
  .logon(payload)
  .then(msg => {
    console.log(JSON.stringify(store.connection(), null, 4));
    console.log(`Logon Status: ${msg}`);
    console.log("calling logoff");
    let c = store.connection();
    console.log(c);
    return store.logoff();
  })
  .then(lmsg => {
    console.log(`Connection status after logoff: ${lmsg}`);
  })
  .catch(err => console.log(err));
