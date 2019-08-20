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
 * Testing Application Data Management (setAppData and getAppData)
 */
"use strict";
let restaf  = require("restaf");
let prtUtil = require("./prtUtil");

let store = restaf.initStore();
// Test appdata
async function setup () {
  console.log("Initial value");

  let d = store.getAppData();
  prtUtil.printObj(d, "Initial status");

  store.setAppData("aaa", { x: 1, y: 2 });
  d = store.getAppData();
  prtUtil.printObj(d, "After first set");

  store.setAppData("bbb", { a: 1, b: 2 });
  d = store.getAppData();
  prtUtil.printObj(d, "After second set");

  d = store.getAppData("bbb");
  prtUtil.printObj(d, "Get specific set");

  d = store.getAppData("bbb", "a");
  prtUtil.printObj(d, "Query for nested value");
  

  d = store.getXsrfData();
  console.log(JSON.stringify(d, null,4));
  prtUtil.printObj(d, "xsrf");
  return "completed";
}

setup()
  .then(r => console.log(r))
  .catch(e => console.log(e));
