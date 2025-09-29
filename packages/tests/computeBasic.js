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

'use strict';

const restaf = require("@sassoftware/restaf");
const restaflib = require("@sassoftware/restaflib");
const getLogonPayload = require("./getLogonPayload.js");



run()
  .then((r) => console.log("done"))
  .catch((err) => console.log(JSON.stringify(err, null, 4)));

async function run() {
  let logonPayload = await getLogonPayload();
  let store = restaf.initStore(
    {
      casProxy: true,
      options: {
        proxyServer: null
      }
    });
  let msg = await store.logon(logonPayload);
  console.log(msg);
  let { computeSetup, computeResults } = restaflib;

  let computeSession = await computeSetup(store, null, null);

  let macros = { maxRows: 1000 };

  let src = `
    ods html style=barrettsblue; 
		libname tempdata '/tmp';run; 
		data tempdata.testdata;
		keep x1 x3 x2 key;
		do i = 1 to 10; 
		key=compress('key'||i);
		   x1=i; 
		   x3=i*10;
		   x2='X2'; 
		output;
		end;
		run;
		proc json out = "tempdata.json" pretty nokeys;
		export tempdata.testdata;
		run;
   `;


 
  console.log(Date());
  const checkStatus = (state, context) => {
    console.log(state);
    context.counter = context.counter + 1;

    if (state !== 'completed' && context.counter > 100) {
      context.state = state;
      state = 'exit';
    }
    return state;
  }
  let context = {
    state: '',
    counter: 1
  };
  debugger;
  let computeSummary = null;
  try {
    computeSummary = await restaflib.computeRun(
      store,
      computeSession,
      src,
      macros
      /*
      checkStatus,
      context
      */

    );
    debugger;
    console.log('Job Status: ', computeSummary.SASJobStatus);

  } catch (e) {
    debugger;
    console.log('Job failed')
    console.log(JSON.stringify(e, null, 4));
  }

  console.log(Object.keys(computeSummary));
  console.log('files', computeSummary.files);
  

  await store.apiCall(computeSession.links('delete'));
  let rend = await store.logoff();
  console.log('logoff done', rend);
  return 'done';
};
async function clearSession(store, computeSession, origEtag) {
  console.log({ origEtag });
  let p = {
    headers: {
      'If-None-Match': origEtag
    }
  }
  debugger;
  let state = await store.apiCall(computeSession.links('state'), p);
  console.log('state of session after running job:', state.items());
  debugger;
  let newEtag = computeSession.headers('etag');
  console.log({ newEtag });
  p = {
    headers: {
      'If-Match': newEtag
    }
  }
  console.log(p);
  let status = await store.apiCall(computeSession.links('cancel'), p);
  debugger;

  // await store.apiCall( computeSession.links( 'delete' ) );
  return 'done';
}
