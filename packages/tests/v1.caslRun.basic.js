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

let { casSetup, caslRun} = require( '@sassoftware/restaflib' );
let {initStore,} = require( '@sassoftware/restaf' );
let getLogonPayload = require('./getLogonPayload.js');
let getOpts = require('./getOpts.js');

run() 
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
async function run() {
	
  let store = initStore(
    {
      casProxy: true,
      options: {
        proxyServer: null,
        httpOptions: getOpts(),
      }
    });

  let logonPayload = await getLogonPayload();
  let msg = await store.logon(logonPayload);
  let { session } = await casSetup( store, null );
  
  let p = {
    action: 'builtins.echo',
    data  : {
      code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '
    }
  };
  
  let casl = `
    action builtins.echo/code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '
    send_response({a=1,b=2})
  `;
  debugger;
  let r = await caslRun( store,session, casl );
  console.log('Result:' , JSON.stringify(r, null, 4));

  await store.apiCall( session.links( 'delete' ) );
  return 'done';
};
