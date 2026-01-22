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

/*
 * Simple echo action example
 */
"use strict";

let { casSetup, getReportUri, caslRun, casActionRun} = require( '@sassoftware/restaflib' );
let {initStore,} = require( '@sassoftware/restaf' );
let getLogonPayload = require('./getLogonPayload.js');

run() 
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
async function run() {
	
  let store = initStore();
  let logonPayload = await getLogonPayload();
  
  let msg = await store.logon(logonPayload);
  console.log(msg);
  console.log(store.connection());
  try{
  let {compute} = await store.addServices('compute');
  let t = Object.keys(compute.links().toJS());
  console.log('compute rel', t);
  } catch(err){
	console.error('error', JSON.stringify(err));
  }
  
  return 'done';
};
