/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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
// let testFunctions = require('../examples/testFunctions/masScore.js');
let setupAll = require("../examples/lib/setupAll.js");
let restaflib = require("@sassoftware/restaflib");
let testInfo;

beforeAll(async () => {
  try {
    console.log("calling setup");
    testInfo = await setupAll();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

test("MAS score", async () => {
  let { store, logger } = testInfo;
  let r = await driver(store);
  expect(r).toBe("done");
});

async function driver(store) {
  let modelName = '"Casino - Patron Spend"';
  let userData = { querypatronid: 1 };

  let r = await masScoring(modelName, userData, store, true);
  console.log(JSON.stringify(r));
  return r;
}

async function masScoring(modelName, data, store, uflag) {
  const { masSetup, masDescribe, masRun } = restaflib;
  debugger;
  //setup once per sessison
  let inputs = {};
  let masControl;
  try {
    debugger;
    masControl = await masSetup(store, [modelName]);
    console.log(masControl);
    let describe = await masDescribe(masControl, modelName);
	console.log(describe);
    inputs = {};
    describe.forEach((d) => {
      inputs[d.name] = null;
    });
	console.log(inputs);
    // took out the optimiztion - it seems to be causing issues
    // appEnv.appSession.masScoring = { masControl: masControl, inputs: inputs };
    let scenario = {};
    for (let v in inputs) {
      let v1 = uflag === true ? v.substring(0, v.length - 1) : v;
      scenario[v] = data[v1] == null ? null : data[v1];
    }
    let result = await masRun(store, masControl, modelName, scenario);

    return { status: { statusCode: 0, msg: null }, results: result };
  } catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: err }, results: {} };
  }
}

