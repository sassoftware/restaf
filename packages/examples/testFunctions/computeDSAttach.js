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

let restaflib = require( '@sassoftware/restaflib' );
let { computeSetup } = restaflib;

module.exports = async function computeDSAttach ( testInfo ) {
	let { store, logger } = testInfo;

	let start = new Date();
	let computeSession = await computeSetup( store, null, null );
	console.log( 'step0: ',computeSession.items().toJS());
	let sessionID = computeSession.items( 'id' );
	console.log( 'step0: ',sessionID, ' ', new Date() - start );

	start = new Date();
	let session1 = await computeSetup( store, null, null, null, sessionID );
	let sessionID1 = session1.items( 'id' );
	console.log( 'step1 ',sessionID1, ' ', new Date() - start );

	start = new Date();
	let session2 = await computeSetup( store, null, null, null, computeSession );
	let sessionID2 = session2.items( 'id' );
	console.log( 'step 3:', sessionID2, ' ', new Date() - start );

	console.log( sessionID, '\n', sessionID1, '\n', sessionID2 )
	/*
	let macros = { maxRows: 100 };
	let src = `

        ods html style=barrettsblue; 
		libname tempdata '/tmp';run; 
		data tempdata.testdata;
		keep x1 x2 x3 key;
		do i = 1 to 10; 
		   x1=i; 
		   x2=3; x3=i*10; key=compress('key'||i);
		output;
		end;
		run;
		proc print; run;
        
			
            `;
	let computeSummary = await restaflib.computeRun(
		store,
		session,
		src,
		macros

    );

	console.log(computeSummary.SASJobStatus);
	*/
	await store.apiCall( computeSession.links( 'delete' ) );
	return 'done'
};
