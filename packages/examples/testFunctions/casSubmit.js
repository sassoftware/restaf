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

let { casSetup} = require( '@sassoftware/restaflib' );

module.exports = async function casSubmit ( testInfo ) {
	let { store, logger } = testInfo;
  let { session } = await casSetup( store, null );
  logger.info( session.items().toJS() );
    
  let p = {
    action: 'builtins.echo',
    data  : {
      code: 'data casuser.score; do i = 1 to 10; x1=10;x2=20;x3=30; score1 = x1+x2+x3;end; run; '
    }
  };

  logger.info( p );

  const progress = ( status, jobContext ) => {
    console.log( 'progress ', status );
    return ( status.items.isIdle === false );
  }

  // let r = await store.runAction(session, p,'AAA', null,'wait',5,progress);

  let r = await store.runAction( session, p );
  logger.info( r );
  await store.apiCall( session.links( 'delete' ) );
  return 'done';
};
