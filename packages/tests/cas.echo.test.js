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
  //let logonPayload = await getLogonPayload();
  let logonPayload = {
      host: process.env.VIYA_SERVER,

      authType: "password",
      user: 'kumar',
      password: 'Alav1925@sas',
      clientID: 'mcppw',
      clientSecret: 'jellico',
    };
  console.log('logon payload', logonPayload);
  let msg = await store.logon(logonPayload);
  console.log(msg);
 

  let { session } = await casSetup( store, null );
  
  let p = {
    action: 'builtins.echo',
    data  : {
      code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '
    }
  };
  
  debugger;
  //let r = await store.runAction( session, p );
    let r = await store.runAction( session, p );
  debugger;
  console.log('after run action 1', (r, null,4));

  await store.apiCall( session.links( 'delete' ) );
  return 'done';
};
