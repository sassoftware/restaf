/*
  ------------------------------------------------------------------------------------
	Copyright (c) SAS Institute Inc.
	Licensed under the Apache License, Version 2.0 (the 'License');
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

  let { casSetup, casFetchData, casUpdateData } = require('@sassoftware/restaflib');
  
  module.exports = async function casFetchScrollFail(testInfo) {
		  let {store, logger} = testInfo;
		  let { session } = await casSetup(store);
		  debugger;
		  let actionPayload = {
			  action: 'datastep.runCode',
			  data: {
				  single: 'YES',
				  code:
					  'data casuser.score; length longv varchar(20); do key = 1 to 15; longv="longvariable"||key; key=key; x1=10*key;x2=20*key;x3=30*key; score1 = x1+x2+x3;output;end;run; '
			  }
		  };
  
		  await store.runAction(session, actionPayload);
  
		  let payload = {
			  start: 20,
			  limit: 10,
			  format: true,
			  where: '',
			  table: { caslib: 'casuser', name: 'score' },
			  
		  };
		  let result;
		  debugger;
		  try {
			result = await casFetchData(store, session, payload);
		  } catch(err) {
			  console.log(JSON.stringify(err, null, 4));
			  throw 'Failed fetch';
		  }
		  console.log('The next start is at:' + JSON.stringify(result.pagination, null,4));
		  console.log(result.data.rows);
		  debugger;
		  while (result.pagination.next != null) {
			  debugger;
			   console.log('The start is at: ' + JSON.stringify(result.pagination.next.start));
			   result = await casFetchData(store, session, result.pagination.next);
			   debugger;
			   console.log(Object.keys(result.pagination));
		  };
		   console.log('--------------------------------------- scroll backwards');
		  let done = false;
		  debugger;
		  do {
			  console.log('The start is at: ' + JSON.stringify(result.pagination.prev.start));
			  result = await casFetchData(store, session, result.pagination.prev);
			  console.log('The next start is at:' + result.pagination.prev);
			  console.log(result.pagination.point);
		  } while (result.pagination.prev != null);
  
		  await store.apiCall(session.links('delete'));
		  return 'done';
	  }
  