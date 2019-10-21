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
let restaflib = require('restaflib');
let {casSetup, caslRun, computeSetup, computeRun, casFetchData, print} = restaflib;

let store = restaf.initStore();

store.logon(payload)
  .then(r => runExamples(store))
  .catch(e => {
       console.log(e);
  });

async function runExamples () {
  await test_caslRun();
  await test_computeRun();
  await test_casFetchData();
}

//
// caslRun 
//
async function test_caslRun () {
  let {session} = await restaflib.casSetup (store);
  /* Recommendation: Store the casl code in a repository */
  let casl = `
          print 'input values';
          print _args_;
           action datastep.runcode/ single='YES' code = 'data casuser.a; x=1; run;';
           action table.fetch r=r1/
              table= { caslib= 'casuser', name= 'a' } ;
              run;
              action datastep.runcode/ single='YES' code = 'data casuser.b; y=1; run;';
            action table.fetch r=r2/
              table= { caslib= 'casuser', name= 'b' } ;
              run;
           c = {a=10, b=20};
           send_response({a=r1, b=r2, c=c});
        `;
  let args   = {a: "this is arguments", b: "more data"};

  let result = await restaflib.caslRun (store, session, casl, args);
  print.object(result.c, 'Selected Cas Results');
  await store.apiCall(session.links('delete'));
 }

 //
 // computeRun
 //
 async function test_computeRun () {
   let {getLog} = restaflib;
  let computeSession = await computeSetup(store);
  console.log('session');

  /* prep input */
  let macros = {maxRows: 10};
  let src =   `data work.a; do i = 1 to &maxRows; x=1; end; run; `;
  
  print.titleLine('Compute Service');

  let computeSummary = await computeRun(store, computeSession, macros, src);
  let log = await getLog (store, computeSummary);
  print.logListLines(log);

  await store.apiCall(computeSession.links('delete'));
}

//
// casFetchData
//
async function test_casFetchData () {
  let {session} = await casSetup(store);
  let control = {
    from  : 1,
    count : 20,
    format: true
  }
  debugger;
  let data = await restaflib.casFetchData(store, session, {caslib: 'Public', name: 'cars'}, control);
  print.object(data.pagination, 'Pagination information');
  print.object(data, 'result from fetch');
  await store.apiCall(session.links('delete'));
}
 

