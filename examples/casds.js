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
 * running a simple data step in CAS
 */
"use strict";

let restaf = require("../lib/restaf");
let payload = require("./config")("restaf.env");
let casSetup = require("./lib/casSetup");
let listCaslibs = require("./lib/listCaslibs");
let printCasTable = require("./lib/printCasTable");
let prtUtil = require("../prtUtil");

let store = restaf.initStore({ casProxy: true });

async function example (store, logonPayload, sessionName) {
  let { apiCall } = store;

  let { servers, session } = await casSetup(store, payload, sessionName);
  let p = {
    action: "datastep.runCode",
    data  : {
      code: "data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; "
    }
  };
  await store.runAction(session, p);

  p = {
    action: "table.tableExists",
    data  : { caslib: "casuser", name: `score` }
  };
  await store.runAction(session, p);

  p = {
    action: "table.fetch",
    data  : { table: { caslib: "casuser", name: "score" } }
  };

  let fetchResult = await store.runAction(session, p);
  printCasTable(fetchResult, "Fetch");

  p = {
    action: "table.tableDetails",
    data  : { caslib: "casuser", name: `score` }
  };
  await store.runAction(session, p);

  // await apiCall(session.links('delete'));

  return "Success";
}

// Run the example
example(store, payload, "example1")
  .then(msg => console.log(msg))
  .catch(err => prtUtil.printErr(err));
