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
  let {files} = await store.addServices('files');
  let payload = {
    data   : ' ', 
    headers: {
            'Content-Disposition': `inline; form-data; filename=${name} name=${name}`,
            'content-type'       : `application/pdf`
        }
    };
  debugger;
  let createCmd = files.links('create');
  let newFile = await store.apiCall (createCmd, payload);
  debugger;
  let uri = newFile.links('self', 'link', 'uri');
  console.log(uri);

  /* prep input */
  let macros = {maxRows: 5};
  let src =  `
  filename xxx filesrvc '${uri}' old;
  ods pdf file=xxx;
  
  
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
      ods pdf close;run;`;
  
  print.titleLine('Compute Service');

  let computeSummary = await restaflib.computeRun(store, computeSession, src,  macros);

  
  let log = await restaflib.computeResults(store, computeSummary, 'log');
  print.logListLines(log);
  // let filelist = await restaflib.computeResults(store,computeSummary, 'files');
  // print.object(filelist);
  // let pdf = await restaflib.computeFileContent(store, computeSummary, filelist[0], false);
  // console.log(`pdf: ${pdf}`);
  /*

  let ods = await restaflib.computeResults(store, computeSummary, 'ods');
  console.log(ods);
  */
 
  uri = newFile.links('content', 'link', 'uri');

  console.log(`Direct access to folder: ${process.env.VIYA_SERVER}${uri}`);

  // await store.apiCall(computeSession.links('delete'));
}


 

