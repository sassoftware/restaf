/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

import caslRunBase from './caslRunBase.js';
import programs from './programs/index.js';

/**
 *
 * @description Calls cas server and returns the results(async)
 * 
 * @async
 * @module caslRun
 * @category restaflib/cas
 * 
 * @param {store} store    - restaf store
 * @param {rafObject} session  - cas session
 * @param {string} src      - casl src statements
 * @param {object=} args     - user input args (reference this as _args_ in casl program)
 * @param {boolean=} useCommons - include the common casl programs(checkAndLoad etc...)
 * @returns {promise}  returns results from cas
 * @example

 * let restaf = require("@sassoftware/restaf");
let payload = require('./config')();
let {casSetup} = require('@sassoftware/restaflib');

let prtUtil = require("./prtUtil");

let store = restaf.initStore({casProxy: true});
async function example () {
  let { session } = await casSetup (store, payload);
  // console.log(JSON.stringify(session.links(), null, 4));
  let casl = `
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


  let r = await store.runCasl(session, casl);

  console.log(r.items().toJS());
  let a = r.items().toJS();
  console.log(a);
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
*/

async function caslRun(store, session, src, args, useCommons, ...rest) {
  let tsrc = src;

  if (useCommons !== false) {
    tsrc = programs['commonCasl']() + ' ' + src;
  }
  let result = await caslRunBase(store, session, tsrc, args, ...rest);

  return result.items().toJS();
}
export default caslRun;
