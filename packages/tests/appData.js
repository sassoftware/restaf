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
 * Testing Application Data Management (setAppData and getAppData)
 */
"use strict";
let restaf = require( "@sassoftware/restaf" );
let {casSetup} = require( "@sassoftware/restaflib" );
// let prtUtil = require("../prtUtil");


// Test appdata
async function setup () {
  console.log( "Initial value" );
  let store = restaf.initStore();
  let d = store.getAppData();
  console.log( d.toJS() );

  store.setAppData( "aaa", { x: 1, y: 2 } );
  d = store.getAppData();
  console.log( d.toJS(), "After first set" );

  store.setAppData( "bbb", { a: 1, b: 2 } );
  d = store.getAppData();
  console.log( d.toJS(), "After second set" );

  d = store.getAppData( "bbb" );
  console.log( d.toJS(), "Get specific set" );

  d = store.getAppData( "bbb", "a" );
  console.log( d, "Query for nested value" );

 
  return "completed";
}

setup()
  .then( r => console.log( r ) )
  .catch( e => console.log( e ) );