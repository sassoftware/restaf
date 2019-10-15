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
 * Simple echo action example
 */
"use strict";

let restaf     = require("restaf");
let payload    = require('./config')();
let {casSetup, print} = require("restaflib");

let store = restaf.initStore();
async function example () {
  let { session } = await casSetup(store, payload, "cas");
  
  let p = {
    action: "echo",
    data  : { code: "data casuser.data1; x=1;put x= ; run; " }
  };
  debugger;
  let r = await store.runAction(session, p);
  print.items(r, 'Action Echo Results');
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
