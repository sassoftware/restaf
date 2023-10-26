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
const testFunctions = require( '../examples/testFunctions/computeDS.js' );
const setupAll = require( '../examples/lib/setupAll' );
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

test( 'cas.fetch.scroll.js', async () => {
	let r = await testFunctions( testInfo );
	expect( r ).toBe( 'done' );
} );


	