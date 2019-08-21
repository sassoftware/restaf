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

 //
 // For this to work the logon user must have admin credentials
 //
let restaf  = require('restaf');
let {config} = require('@restaf/utility');
let payload = config();

let store = restaf.initStore();

store.logon (payload)
.then (()=> listClients(store))
.then (r => console.log(r))
.catch(e => console.log(e));

async function listClients (store) {
  let payload = {
    url    : `${process.env.VIYA_SERVER}/SASLogon/oauth/clients`,
    method : 'GET',
    headers: {
      authorization: 'bearer ' + store.connection()['token']
    }
  }

    let r = await store.request(payload);
    r.data.resources.map (rr=> {
      if (rr.client_id.indexOf('sas.') === -1){
         console.log(`clientid: ${rr.client_id} , grantTypes: ${rr.authorized_grant_types} redirect= ${rr.redirect_uri}`);
      }
    })
    return 'done';
    

}
