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

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();
let restaflib = require('@sassoftware/restaflib');
let {casSetup, caslRun, computeSetup, computeRun, casFetchData, print} = restaflib;

let store = restaf.initStore();

store.logon(payload)
  .then(r => test_computeRun(store))
  .catch(e => {
       print.object(e);
  });

 async function test_computeRun () {
  
  let computeSession = await computeSetup(store);
  let sessionid = computeSession.items('id');
  let name = `${sessionid}/test_computeRun.pdf`;

  console.log(`Viya Server is: ${process.env.VIYA_SERVER}`);

  /* prep input */
  let macros = {maxRows: 5};
  let src =  `

  ods html style=barrettsblue; 

  data work.dtemp1;
      array x{10};  
      do j = 1 to &maxRows;  
        do i = 1 to 10;  
          x{i} = i * 10;  
          end;  
       output;  
       put _ALL_;  
      end;  
      run;  
      proc print;run;  
      ods html close;
      run;
    ;
    `;
  
  print.titleLine('Compute Service');

  let computeSummary = await restaflib.computeRun(store, computeSession, src,  macros);

  
  let log = await restaflib.computeResults(store, computeSummary, 'log');
  print.logListLines(log);
  let ods = await restaflib.computeResults(store, computeSummary, 'ods');
  console.log(ods);

  await store.apiCall(computeSession.links('delete'));
  console.log(`Viya Server is: ${process.env.VIYA_SERVER}`);   
 }


 

