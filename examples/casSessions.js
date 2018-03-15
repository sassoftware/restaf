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

'use strict';

let restaf         = require('../lib/restaf');
let payload     = require('./config')('restaf.env');
let casSetup    = require('./casSetup');
let runAction   = require('./runAction');

let store = restaf.initStore();
async function casSession (store, payload, sessionName) {

    // logon

    await store.logon(payload);

    // get root end points of casManagement
    let {casManagement} = await store.addServices('casManagement');

    // get list of current servers
    let servers = await store.apiCall(casManagement.links('servers'));

    // get list of servers'
    // create a session named cas on the first server
    console.log(servers.route);
    let casserver = servers.itemsList(0);
    console.log(`cas servername: ${casserver}`);
    let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'), { data: { name: sessionName } });
    console.log('--------------------------------------');
    console.log(session.links('execute' , 'link', 'href'));
    console.log('--------------------------------------');

    let sessionList = await store.apiCall(servers.itemsCmd(casserver, 'sessions'));

    console.log('List of sessions');
    sessionList.itemsList().map((l, k) => {
        console.log(`${k} = ${l}`);
    });

    console.log(`rels  for a session links`);
    session.links().forEach((s,k) => {
        console.log(k);
    });
    return 'ok';
}

casSession(store, payload, 'last')
    .then(r => console.log(r))
    .catch(err => console.log(err));
