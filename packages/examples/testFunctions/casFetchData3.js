/*
  ------------------------------------------------------------------------------------
	Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved	Licensed under the Apache License, Version 2.0 (the 'License');
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
 *
	http://www.apache.org/licenses/LICENSE-2.0
 *
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an 'AS IS' BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
  ---------------------------------------------------------------------------------------
 *
 */

/*
  Run a cas data step and then retrieve the created table
 */
'use strict';

let { casSetup, casFetchRows, casUpdateData } = require( '@sassoftware/restaflib' );

module.exports = async function casFetchData3( testInfo ) {
	    let {store, logger} = testInfo;
		let { session } = await casSetup( store );

		let actionPayload = {
			action: 'datastep.runCode',
			data  : {
				single: 'YES',
				code  :
					'data casuser.score; length longv varchar(20); do key = 1 to 30; longv="longvariable"||key; key=key; x1=10*key;x2=20*key;x3=30*key; score1 = x1+x2+x3;output;end;run; '
			}
		};

		await store.runAction( session, actionPayload );

		let payload = {
			from  : 1,
			count : 10,
			format: true,
			where : '',
			table : { caslib: 'casuser', name: 'score' },
			
		};
		let result;
		try {
		  result = await casFetchRows( store, session, payload );
		} catch( err ) {
			console.log( JSON.stringify( err, null, 4 ) );
			throw 'Failed fetch';
		}
		 console.log( 'The next start is at:' + result.pagination.toString() );
		console.log( result.data.rows[0].toString() );
		console.log( result.data.schema );

		while ( result.pagination.next.from !== -1 ) {
			 console.log( 'The start is at: ' + JSON.stringify( result.pagination.next.from ) );
			 result = await casFetchRows( store, session, result.pagination.next );
			 console.log( 'The next start is at:' + result.pagination.next.from );
		}
		 console.log( '--------------------------------------- scroll backwards' );
		let done = false;
		while ( done === false ) {
			 console.log( 'The start is at: ' + JSON.stringify( result.pagination.prev.from ) );
			 if ( result.pagination.prev.from === 1 ) {
				done = true;
			 }
			 result = await casFetchRows( store, session, result.pagination.prev );
			 console.log( 'The next start is at:' + result.pagination.prev.from );
	
		}

		// test update

		let where = {key: 1};
		let data = {x1: 100, x2: 200, score1: 600};
		let p = {
			keys : where,
			data : data,
			table: {caslib: 'casuser', name: 'score'}

		}
		let u = await casUpdateData( store, session, p );
		console.log( u );
		
		payload = {
			from  : 1,
			count : 1,
			format: true,
			where : ' ',
			table : { caslib: 'casuser', name: 'score' },
			
		};
		
		result = await casFetchRows( store, session, payload );
		
		console.log( JSON.stringify( result, null,4 ) );

		await store.apiCall( session.links( 'delete' ) );
		return 'done';
	}
