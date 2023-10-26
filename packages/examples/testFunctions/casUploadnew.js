/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved *   Licensed under the Apache License, Version 2.0 (the 'License');
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an 'AS IS' BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let restaflib = require( '@sassoftware/restaflib' );

let { casSetup, casUpload, casFetchRows,casAppendTable} = restaflib;

let fs = require( 'fs' );

module.exports = async function casUploadnew ( save, testInfo ) {
	let { store, logger } = testInfo;
	let { session } = await casSetup( store, null );

	let altsrc = readFile( 'cars', 'csv' );
	let output = 'casuser.dtemp1';
	let table = {caslib: 'casuser', name: 'dtemp1'};

	

	let r = await casUpload(
		store,
		session,
		null,
		table,
		save,
		altsrc
	);
	console.log( r );
    console.log( '----------------- repeat' );
   
	r = await casUpload(
		store,
		session,
		null,
		table,
		save,
		altsrc
	);
	console.log( r );

	console.log( 'fetch the first few rows' );
	let [ caslib,name ] = output.split( '.' );
	// let table = {caslib: caslib, name: name};
	let payload = {
		from  : 1,
		count : 10,
		format: false,
		table : table
	}
	let data = await casFetchRows( store, session, payload );
	console.log( JSON.stringify( data.data.rows, null,4 ) );

	await store.apiCall( session.links( 'delete' ) );
	return data.data.rows;
};

function readFile ( filename, fileType ) {
	let data = fs.readFileSync( `./data/${filename}.${fileType}`, 'utf-8' );
	console.log( data );
	return data;
  }