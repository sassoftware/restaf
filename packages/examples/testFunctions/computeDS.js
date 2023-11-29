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
let { computeSetup, computeResults } = restaflib;

module.exports = async function computeDS ( testInfo ) {
	let { store, logger } = testInfo;

	let computeSession = await computeSetup( store, null, null );
 
	let macros = { maxRows: 1000 };
	let src = `
		%let syscc=0;
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
		quit;
            `;
	logger.info( 'Compute Service' );
	console.log( Date() );
	const checkStatus = ( state, context ) => {
		console.log( state );
		context.counter = context.counter + 1;
		
		if ( state !== 'completed' && context.counter > 100 ) {
			context.state = state;
			state = 'exit';
		}
		return state;
	}
	let context = {
		state  : '',
		counter: 1
	};
	debugger;
	let computeSummary = await restaflib.computeRun(
		store,
		computeSession,
		src,
		macros
		/*
		checkStatus,
		context
		*/

    );
	let log = await computeResults(store, computeSummary, 'log');
    console.log(log);
	log.map( ( data ) => {
        let line = data.line.replace( /(\r\n|\n|\r)/gm, "" );
        if ( line.length === 0 ) {
           console.log( ' ' );
        } else {}
		  console.log( line );
	} );

	await store.apiCall( computeSession.links( 'delete' ) );
    return 'done';
};
