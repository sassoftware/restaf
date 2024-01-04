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
let testFunctions = require( '../examples/testFunctions/casEcho' );
let setupAll = require( '../examples/lib/setupAll' );
let testInfo;
beforeAll( async () => {
	try {
		
		console.log( 'calling setup' );
		testInfo = await setupAll();
	} catch ( err ) {
		console.log( err );
		process.exit( 1 );
	}
} );

test( 'CAS Echo', async () => {
	let r = await testFunctions( testInfo );
	expect( r ).toBe( 'done' );
} );
module.exports = async function casEcho ( store ) {

  let { session } = await casSetup( store, null );
  store.setAppData( 'casSession', session );
  debugger;
  let t = store.getAppData( 'casSession' ).toJS();
  console.log( t );
  session = t;
  console.log('-----------------------------', JSON.stringify(store.getXsrfData()));
  let p = {
    action: 'builtins.echo',
    data  : {
      code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '
    }
  };
  logger.info( p );

  let r = await store.runAction( session, p );
  console.log('-----------------------------', JSON.stringify(store.getXsrfData()));
  /*
  console.log( JSON.stringify( session.links( "execute" ), null, 4 ) );
  console.log( r.items().toJS() );
  console.log( r.items().toJS().disposition.severity );
  */
  logger.info( r );
 
}


	