/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
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
let testFunctions = require( './testFunctions' );
let setupAll = require( './lib/setupAll' );
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

test( 'CAS Session', async () => {
	let r = await testFunctions.casSession( testInfo );
	expect( r ).toBe( 'done' );
} );

test( 'CAS Echo', async () => {
	let r = await testFunctions.casEcho( testInfo );
	expect( r ).toBe( 'done' );
} );

test( 'CAS Submit', async () => {
	let r = await testFunctions.casSubmit( testInfo );
	expect( r ).toBe( 'done' );
} );


test( 'CAS DataStep and Fetch', async () => {
	let r = await testFunctions.casDSandFetch( testInfo );
	expect( r ).toMatchSnapshot();
} );
/*
test('CAS fetchrows with where with where', async () => {
	let r = await testFunctions.casDSandFetch2(testInfo);
	expect(r).toMatchSnapshot();
});

test('CAS fetchrows with where v2', async () => {
	let r = await testFunctions.casDSandFetch2v2(testInfo);
	expect(r).toMatchSnapshot();
});
*/
test.only( 'CAS DataStep and Fetch2', async () => {
	let r = await testFunctions.casFetchData3( testInfo );
	expect( r ).toBe( 'done' );
} );
test( 'CAS Tables', async () => {
	let r = await testFunctions.casTables( testInfo );
	expect( r ).toBe( 'done' );
} );

test( 'CAS upload csv', async () => {
	let r = await testFunctions.casUploadCsv( testInfo );
	expect( r ).toMatchSnapshot();
} );
	