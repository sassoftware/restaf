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

  let { casSetup, casFetchData, casUpdateData } = require( '@sassoftware/restaflib' );
  
  module.exports = async function casFetchScroll( testInfo ) {
		  let {store, logger} = testInfo;
		  let { session } = await casSetup( store );
		  const cachef = [];
		  const cacheb = [];
		  
		  let actionPayload = {
			  action: 'datastep.runCode',
			  data  : {
				  single: 'YES',
				  code  :
					  'data casuser.score; length longv varchar(20); do key = 1 to 35; longv="key||longvariable"||key; key=key; x1=10*key;x2=20*key;x3=30*key; score1 = x1+x2+x3;output;end;run; '
			  }
		  };
  
		  await store.runAction( session, actionPayload );
  
		  let payload = {
			  start : 0,
			  limit : 10,
			  format: true,
			  where : 'x3 > 100',
			  table : { caslib: 'casuser', name: 'score' },
			  
		  };
		  let result;
		  
		  try {
			result = await casFetchData( store, session, payload );
		  } catch( err ) {
			  console.log( JSON.stringify( err, null, 4 ) );
			  throw 'Failed fetch';
		  }
		  
		  cachef.push( [ result.data.scrollOptions, result.data.rows.length ] );
		  
		  while ( result.pagination.next != null ) {
			  
			   result = await casFetchData( store, session, result.pagination.next );
			   cachef.push( [ result.data.scrollOptions, result.data.rows.length ] );
			   
		  }
  
  
		   console.log( '--------------------------------------- scroll backwards' );
		  let done = false;
		  
		  do {
			  result = await casFetchData( store, session, result.pagination.prev );
			  cacheb.push( [ result.data.scrollOptions, result.data.rows.length ] );
			  debugger
		  } while (
			  result.pagination.prev != null );
		  
		  console.log( JSON.stringify( cachef, null,4 ) );
		  console.log( JSON.stringify( cacheb, null,4 ) );
		  await store.apiCall( session.links( 'delete' ) );
		  return 'done';
	  }
  