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
let { computeSetup, computeSetupTables} = restaflib;

module.exports = async function computeFetchScrollWhere( testInfo ) {
	let { store, logger } = testInfo;

	let computeSession = await computeSetup( store, "SAS Studio compute context", null );
	// const preamble = `libname test '/mnt/viya-share/data/deva';run;`;
	const preamble = `libname tempdata '/tmp';run; 
	data tempdata.testdata;
	keep x1 x2 x3 key;
	do i = 1 to 15; x1=i; x2=3; x3=i*10; key=compress('key'||i);
	output;
	end;
	run;
	`;
	  

	logger.info( 'Compute Service Tables' );
	let t = {libref: 'tempdata', name: 'testdata'};
	
	
	
	let tableSummary = await computeSetupTables( store, computeSession, t, preamble );
	
	

	// let tname = `${t.libref}.${t.name}`;
	
	let data = await restaflib.computeFetchData(
		store,
		tableSummary,
		t,
		'first',
		{qs: {where: 'x3 > 50'}}
	);

	
	console.log( ' l = ' , data.rows.length );
	console.log( '--------------------', data.scrollOptions );
	console.log( 'page: ', data.pagination );

	while ( data.scrollOptions.indexOf( 'next' ) !== -1 ){
		console.log( data.scrollOptions );
		data = await restaflib.computeFetchData( store, tableSummary, t , 'next' );
		if ( data != null ) {
	  	  console.log( 'data=' , data.rows );
		} else {
			console.log( 'data is null' );
		}
		console.log( '--------------------> ',data.scrollOptions );
		
		
	}

	do {
		data = await restaflib.computeFetchData( store, tableSummary, t , 'prev' );
		if ( data != null ) {
	  	  console.log( 'data=' , data.rows );
		} else {
			console.log( 'data is null' );
		}
		
		console.log( '--------------------> ',data.scrollOptions );
	} while ( data.scrollOptions.indexOf( 'prev' ) !== -1 );
	
	await store.apiCall( computeSession.links( 'delete' ) );
    return 'done';
};
