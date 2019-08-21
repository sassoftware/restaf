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

let restaf = require("@restaf/core");
let {config} = require('@restaf/utility');
let payload = config();
let casSetup = require("@restaf/commons/casSetup");
let fs = require("fs");

let pem = fs.readFileSync(`${process.env.PEMFILE}`);
let prtUtil = require("../prtUtil");

let store = restaf.initStore({ pem: pem });
async function example () {
  let { session } = await casSetup(store, payload, "cas");
  // console.log(JSON.stringify(session.links(), null, 4));
  let p = {
    action: "echo",
    data  : { code: "data casuser.data1; x=1;put x= ; run; " }
  };
  debugger;
  let r = await store.runAction(session, p);
  console.log(r.items("log"));
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
