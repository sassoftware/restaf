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
let {print} = restaflib;

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function setup () {
  let store = restaf.initStore();
  let msg = await store.logon(payload);
  console.log(restaflib);

  /*
  let {jesSetup, jesRun} = restaflib;
  let jes = await jesSetup(store);
  let code = 'data a; x=&value;run; proc print; run;';
  let args = {
    value: 10
  };

  let jesResult = await jesRun(store, jes,code, null, args)
  print.items(jesResult, 'jesResults');
*/

  let {casSetup, caslRun} = restaflib;
  let {session} = await casSetup(store);
  let control = {
    from  : 1,
    count : 20,
    format: true
  }
  debugger;
  let data = await restaflib.casFetchData(store, session, {caslib: 'Public', name: 'cars'}, control);
  print.object(data, 'result from fetch');

  /* json to dictionary */

  let {jsonToDict} = restaflib;
  let x= {a: 10, b: 'abc'};
  let t = jsonToDict (x, '_a_');
  print.object(t, 'jsonToDict');

  /* run a compute service */

  let {computeSetup, computeRun, getLog} = restaflib;
  let computeSession = await computeSetup(store);
  console.log('session');

  /* prep input */
  let src =   `data _null_; do i = 1 to &maxRows; x=1; end; run; `;
  let macros = {maxRows: 10};

  print.titleLine('Compute Service');

  let computeSummary = await computeRun(store, computeSession, macros, src);
  let log = await getLog (store, computeSummary);
  print.logListLines(log);

  
  /* usually you will get this from a repo */
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

  let result = await caslRun(store, session, casl, args);
  print.object(result.items('results', 'c'), 'Selected Cas Results');

  

  return true;
}

 setup()

  .then(r => console.log(r))
  .catch(e => {
       console.log('failed');
       console.log(e);
  });
