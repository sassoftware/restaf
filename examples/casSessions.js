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

    // create a session on the first server
   debugger;
    let casserver = servers.itemsList(0);
    console.log(`cas servername: ${casserver}`);
    let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'), { data: { name: sesName } });
    let id = session.items('id');

    console.log(`name of New session: ${session.items('name')}`);
    console.log(`id of New  session: ${id}`);
    console.log(JSON.stringify(session.links('execute', 'link', 'href'), null, 4));
    console.log(JSON.stringify(session.links('casproxy', 'link', 'href'), null, 4));
    console.log(JSON.stringify(session.links('self', 'link'), null, 4));



    //
    // Assume you saved the id above and came back the next day and wanted to reattach to the same session
    //
    // Now filter on the list of sessions and find the one with desired id and reconnect
    //

    
    payload =  {
        qs: { 
            filter: `eq( id,'${id}')`
        }
      }
    let sessionList = await store.apiCall(servers.itemsCmd(casserver, 'sessions'), payload);

    //
    // verify that we found the right session
    //

    console.log(`List of sessions found ${sessionList.itemsList().size} `);
    let name  = sessionList.itemsList(0);

    console.log(`Found name = ${name}`);
    id = sessionList.items(name, 'data','id');

    console.log(`Found id: ${id}`)
    console.log(JSON.stringify(sessionList.itemsCmd(name, 'execute', 'link'), null, 4));
    console.log(JSON.stringify(sessionList.itemsCmd(name, 'casproxy', 'link'), null, 4));
    console.log(JSON.stringify(sessionList.itemsCmd(name, 'self', 'link'), null, 4));

    //
    // need to reattach to the session that was found
    // we use the self rel to accomplish this task.
    //

    let selfcmd = sessionList.itemsCmd(name, 'self');
    session = await store.apiCall(selfcmd);

    console.log(`Attached session name: ${session.items('name')}`);
    console.log(`Attached Session id: ${session.items('id')}`);
    console.log(JSON.stringify(session.links('execute', 'link', 'href'), null, 4));
    console.log(JSON.stringify(session.links('casproxy', 'link', 'href'), null, 4));
    console.log(JSON.stringify(sessionList.itemsCmd(name, 'self', 'link'), null, 4));


    //
    // Now use the attached session
    //
    payload = {
        action: 'echo',
        data  : {x: `paul's example`}
    }

    let r = await store.runAction(session, payload);

    console.log(JSON.stringify(r.items('disposition'), null,4));
    
    return 'done';
}

casSession(store, payload, 'last')
    .then(r => console.log(r))
    .catch(err => console.log(JSON.stringify(err, null,4)));
