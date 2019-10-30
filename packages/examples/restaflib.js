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
       print.object(e);
  });

async function runExamples () {
  await test_computeRun();
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
            action table.fetch r=r2/
              table= { caslib= 'public', name= 'cars' } ;
              run;
           c = {a=10, b=20};
           send_response({a=r1, cars=r2, c=c});
        `;
  let args   = {a: "this is arguments", b: "more data"};

  let result = await restaflib.caslRun (store, session, casl, args);
  // print.object(result, 'Cas Results');
  console.log(`Job status: ${result.status}`);
  print.object(result.log, 'Log');
  print.object(result.disposition, 'Disposition');
  print.object(result.results, 'Data of real interest');
  await store.apiCall(session.links('delete'));
 }

 //
 // computeRun
 //
 async function test_computeRun () {
  
  let computeSession = await computeSetup(store);
  console.log('session');

  /* prep input */
  let macros = {maxRows: 100};
  let src =  `ods html style=barrettsblue;
  data work.dtemp1;
      array x{10};  
      do j = 1 to 300;  
        do i = 1 to 10;  
          x{i} = i * 10;  
          end;  
       output;  
       put _ALL_;  
      end;  
      run;  
      proc print;run;  
      ods html close;`;
  
  print.titleLine('Compute Service');

  let computeSummary = await restaflib.computeRun(store, computeSession, src,  macros);

  let log = await restaflib.computeResult(store, computeSummary, 'log');
  print.logListLines(log);
  let list = await restaflib.computeResult(store, computeSummary, 'listing');
  print.logListLines(list);
  let ods = await restaflib.computeResult(store, computeSummary, 'ods');
  console.log(ods);

  let data = await restaflib.computeTable(store,computeSummary, 'DTEMP1');
  console.log(data.columns);
  console.log(data.rows[0]);
  console.log(data.scrollOptions);
  do {
    data = await restaflib.computeTable(store,computeSummary, 'DTEMP1', 'next');
    if (data !== null) {
      console.log(data.rows[0]);
      console.log(data.scrollOptions);
    }
  } while (data != null);

  await store.apiCall(computeSession.links('delete'));
}



//
// casFetchData
//
async function test_casFetchData () {
  let {session} = await casSetup(store);
  let payload = {
    from  : 1,
    count : 20,
    format: true,
    table : {caslib: 'Public', name: 'cars'}
  };
  debugger;

  // Get the first 20 records
  let result = await restaflib.casFetchData(store, session, payload);
  console.log(result.data.toString());
  console.log(`The next start is at: ${result.pagination.next.from}`);
  console.log(result.data.rows[0].toString());

  // Scroll forward to the end 
  while (result.pagination.next.from !== -1) {
    console.log(`The start is at: ${result.pagination.next.from}`);
     result = await restaflib.casFetchData(store, session, result.pagination.next);
     console.log(`The next start is at: ${result.pagination.next.from}`);
     console.log(result.data.rows[0].toString());
  }
  
  console.log('--------------------------------------- scroll backwards');
  // use the last prev to start scrolling backwards to the top
  
  while (result.pagination.prev.from !== -1) {
    console.log(`The start is at: ${result.pagination.prev.from}`);
    result = await restaflib.casFetchData(store, session, result.pagination.prev);
    console.log(`The previous start is at: ${result.pagination.prev.from}`);
    console.log(result.data.rows[0].toString());
 }

  await store.apiCall(session.links('delete'));
}
 

