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

let fs         = require( 'fs' );
let { casSetup, casloadTable,  casUpload} = require( '@sassoftware/restaflib' );
let {initStore} = require( '@sassoftware/restaf' );
let getLogonPayload = require('./getLogonPayload.js');
const restaf = require('@sassoftware/restaf');

run()
  .catch(e => {
	console.error(e);
	process.exit(1);
  });

async function run (  ) {
	let store = initStore();
	let logonPayload = await getLogonPayload();
	console.log('logon payload', logonPayload);
	let msg = await store.logon(logonPayload);

	let { session } = await casSetup( store, null);
	let filename = 'cancerscores';
	let fileType = 'csv';
	let outputName = 'cancerscores';
	let csv = readFile( filename, fileType );

      let rc = await casUpload(store, session,null,{caslib: 'casuser', name: outputName}, true,csv);
    
      console.log('casUpload result', JSON.stringify(rc.items(), null, 4));

	  /*
	let p = {
		action: 'table.fetch',
		data  : { table: { caslib: 'casuser', name: outputName } }
	};

	let actionResult= await store.runAction( session, p );
	console.log(JSON.stringify(actionResult.items( 'tables' ).toJS(), null, 4));
	let t = actionResult.items( 'tables', 'Fetch' ).toJS();
	t.attributes.CreateTime.value = 0.0;
	*/
	

	await store.apiCall( session.links( 'delete' ) );

	return true;
};

function readFile ( filename, fileType ) {
  let data = fs.readFileSync( `./data/${filename}.${fileType}` );
  return data;
}

