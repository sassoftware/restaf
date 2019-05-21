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

let store = restaf.initStore();
async function casSession (store, payload, sesName) {

    // logon

    await store.logon(payload);

    // get root end points of casManagement
    debugger;
    let {casManagement} = await store.addServices('casManagement');

    // get list of current servers
    let servers = await store.apiCall(casManagement.links('servers'));

    // get list of servers'
    // create a session named cas on the first server
   debugger;
    let casserver = servers.itemsList(0);
    console.log(`cas servername: ${casserver}`);
    let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'), { data: { name: sesName } });
    console.log('--------------------------------------');
    console.log(session.links('execute' , 'link', 'href'));
    console.log('--------------------------------------');

    let sessionList = await store.apiCall(servers.itemsCmd(casserver, 'sessions'));

    console.log('List of sessions');
    console.log(`No of sessions: ${sessionList.itemsList().size}`);

    sessionList.itemsList().map((l, k) => {
        console.log(`${k} = ${l}`);
        let thttp = sessionList.items(l, 'cmds', 'execute', 'link', 'href');
        let tproxy = sessionList.items(l, 'cmds', 'casproxy', 'link', 'href');
    });

    let sessionName = sessionList.itemsList(sessionList.itemsList().size - 1);
    console.log(sessionName);
    payload = {
        action: 'echo',
        data  : {x: `Hi there old friend`}
    }
    let execcmd = sessionList.items(sessionName, 'cmds', 'execute');
   // console.log(JSON.stringify(execcmd, null,4));

    let r   = await store.apiCall(sessionList.items(sessionName, 'cmds', 'execute'), payload);
   // console.log(JSON.stringify(r.items(), null, 4));

    let selfcmd = sessionList.items(sessionName, 'cmds', 'self');
    session = await store.apiCall(selfcmd);
    payload = {
        action: 'echo',
        data  : {x: `paul's example`}
    }

    r = await store.runAction(session, payload);

    console.log(JSON.stringify(r.items(), null,4));
    return 'done';
}

casSession(store, payload, 'last')
    .then(r => console.log(r))
    .catch(err => console.log(JSON.stringify(err, null,4)));
