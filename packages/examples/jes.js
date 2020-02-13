/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();
let restaflib = require('@sassoftware/restaflib');
let {jesSetup, jesRun, jesSummary, print} = restaflib;

let store = restaf.initStore();

store.logon(payload)
  .then(r => runExample())
  .catch(e => {
       print.object(e);
  });

  async function runExample () {
    let jes = await jesSetup(store, null);
    let src = 'ods pdf;data a;x=1;run;proc print;run;ods pdf close;';
    let args = {_contextName: 'SAS Job Execution compute context',x: 1, y: 'yyy'};
    let result = await jesRun(store, jes, src, null, args);
    print.items(result, 'jes results');
  }
