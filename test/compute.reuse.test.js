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
// const testFunctions = require( '../examples/testFunctions/computeDS.js' );
const restaf = require("@sassoftware/restaf");
const { computeSetup } = require("@sassoftware/restaflib");

const getToken = require("./getToken.js");

test('compute reuse session', async () => {
	const r = await runit();
	expect(r).toBe('done');
  
  });

async function runit() {
  let casopt = {
    casProxy: process.env.CASPROXY === "NO" ? false : true,
    options: {
      ns: null,
      proxyServer: null,
    },
  };

  console.log("casopt", casopt);
  debugger;
  let store = restaf.initStore(casopt);
  let logonPayload = {
    authType: "server",
    host: process.env.VIYA_SERVER,
    token: getToken(),
    tokenType: "bearer",
    options: casopt,
  };
  let msg = await store.logon(logonPayload);
  console.log(msg);
  let { compute } = await store.addServices("compute");

  let session = await computeSetup(store, null, null);
  let sessionList = await store.apiCall(compute.links("sessions"));
  console.log(sessionList.itemsList().keySeq().toJS());

  let ssid = await store.apiCall(session.links("self"));
  let id = ssid.items("id");
  console.log("session id " + id);
  debugger;

  let p = {
    qs: {
      start: 0,
      limit: 100,
    },
  };
  let sList = await store.apiCall(compute.links("sessions"), p);
  console.log(sList.itemsList().toJS());

  let found = sessionList.itemsList().toJS().includes(id);
  console.log("found ", found);
  let session2 = await computeSetup(store, null, null, null, id);
  ssid = await store.apiCall(session2.links("self"));
  id = ssid.items("id");
  console.log("reused session id " + id);

  p = {
    qs: {
      filter: `eq( id,'${id}')`,
    },
  };
  console.log(p);
  sList = await store.apiCall(compute.links("sessions"), p);
  console.log(sList);
  return "done";
}
