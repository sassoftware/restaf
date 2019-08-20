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

let restaf = require("restaf");
let payload = require('./config')();

let store = restaf.initStore();
async function casSession (store, payload, sesName) {
  // logon

  await store.logon(payload);

  // get root end points of casManagement
  debugger;
  let { casManagement } = await store.addServices("casManagement");

  // get list of current servers
  let servers = await store.apiCall(casManagement.links("servers"));

  // create a session on the first server
  debugger;
  let casserver = servers.itemsList(0);
  console.log(`cas servername: ${casserver}`);
  let session = await store.apiCall(
    servers.itemsCmd(casserver, "createSession"),
    { data: { name: sesName } }
  );
  let id = session.items("id");

  console.log('================================== Initial session information');

  console.log(`name of New session: ${session.items("name")}`);
  console.log(`id of New  session: ${id}`);
  
  console.log('----------------- Verify that the href is set correctly')
  console.log(
    JSON.stringify(session.links("execute", "link", "href"), null, 4)
  );
  console.log(
    JSON.stringify(session.links("casproxy", "link", "href"), null, 4)
  );
  console.log(JSON.stringify(session.links("self", "link"), null, 4));
  
  console.log("================================ end initial session information");

  let t2 = await store.apiCall(session.links('self'));
  //
  // Now use the attached session
  //
  payload = {
    action: "echo",
    data  : { x: `with t2 example` }
  };

  let r = await store.runAction(t2, payload);

  console.log('------------------------- show the output results');

  console.log(JSON.stringify(r.items("results"), null, 4));


  //
  // Assume you saved the id above and came back the next day and wanted to reattach to the same session
  //
  // Now filter on the list of sessions and find the one with desired id and reconnect
  //

 

  //
  // verify that we found the right session
  //

  console.log('=============================== find the old session');

  payload = {
    qs: {
      filter: `eq( id,'${id}')`
    }
  };
  let sessionList = await store.apiCall(
    servers.itemsCmd(casserver, "sessions"),
    payload
  );
  console.log('-------------------- list information on found session')
  console.log(`List of sessions found ${sessionList.itemsList().size} `);
  let name = sessionList.itemsList(0);

  console.log(`Found name = ${name}`);
  id = sessionList.items(name, "data", "id");

  console.log(`Found id: ${id}`);
  console.log(
    JSON.stringify(sessionList.itemsCmd(name, "execute", "link"), null, 4)
  );
  console.log(
    JSON.stringify(sessionList.itemsCmd(name, "casproxy", "link"), null, 4)
  );
  console.log(
    JSON.stringify(sessionList.itemsCmd(name, "self", "link"), null, 4)
  );

console.log('=============================== end of info on old session');


  console.log('============================== connect to the old session');
  //
  // need to reattach to the session that was found
  // we use the self rel to accomplish this task.
  //

  let selfcmd = sessionList.itemsCmd(name, "self");
  session = await store.apiCall(selfcmd);
  
  console.log('------------------------- information on new session')
  console.log(`Attached session name: ${session.items("name")}`);
  console.log(`Attached Session id: ${session.items("id")}`);
  console.log(
    JSON.stringify(session.links("execute", "link", "href"), null, 4)
  );
  console.log(
    JSON.stringify(session.links("casproxy", "link", "href"), null, 4)
  );
  console.log(
    JSON.stringify(sessionList.itemsCmd(name, "self", "link"), null, 4)
  );

  console.log('============================== end of connect to the old session');

  console.log('============================== execute the connected session');
  //
  // Now use the attached session
  //
  payload = {
    action: "echo",
    data  : { x: `paul's example` }
  };

   r = await store.runAction(session, payload);

  console.log('------------------------- show the output results');

  console.log(JSON.stringify(r.items("results"), null, 4));

  return "done";
}

casSession(store, payload, "last")
  .then(r => console.log(r))
  .catch(err => console.log(JSON.stringify(err, null, 4)));
