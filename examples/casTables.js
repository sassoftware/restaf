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

/*
 * Adding a Service
 */
'use strict';

let restaf     = require('../lib/restaf');
let payload = require('./config')('restaf.env');
let prtUtil    = require('../prtUtil');

let store = restaf.initStore();

async function example (store, logonPayload) {

    let {apiCall} = store ;
    // logon;
    await store.logon(logonPayload);

    // get root end points of casManagement
    let {casManagement} = await store.addServices('casManagement');

    // get list of current servers
    let servers = await apiCall(casManagement.links('servers'));
    let casserver = servers.itemsList(0);

    // get list of caslibs
    let caslibs = await apiCall(servers.itemsCmd(casserver , 'caslibs'));

    prtUtil.view(caslibs, 'caslibs');

    for (let i=0; i < caslibs.itemsList().size ; i++) {
        let s = caslibs.itemsList(i);
        let tables = await apiCall(caslibs.itemsCmd(s, 'tables'));
        prtUtil.view(tables, `List of tables in ${s}`);
    }
    return true;
}

// Run the example
example(store, payload)
    .then  (msg => console.log(msg))
    .catch (err => console.log(err));



