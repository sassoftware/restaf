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
let restaf = require("restaf");
let prtUtil = require("./prtUtil");

debugger;
let store1 = restaf.initStore();
debugger;
let store2 = restaf.initStore();

// Test appdata
async function setup () {
  debugger;
  store1.setAppData("aaa", { x: 1, y: 1 });
  let d = store1.getAppData();
  prtUtil.printObj(d, "After first set");

  store2.setAppData("aaa", { x: 2, y: 2 });
  d = store2.getAppData();
  prtUtil.printObj(d, "After first set");

  d = store1.getAppData();
  prtUtil.printObj(d, "After first set");

  return "completed";
}

setup()
  .then(r => console.log(r))
  .catch(e => console.log(e));
