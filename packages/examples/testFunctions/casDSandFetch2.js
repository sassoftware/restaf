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

module.exports = async function casDSandFetch2(testInfo) {
	async function test_casFetchData() {
		let { session } = await casSetup(store);

		let actionPayload = {
			action: 'datastep.runCode',
			data: {
				single: 'YES',
				code:
					'data casuser.score; do key = 1 to 10; x1=10*key;x2=20*key;x3=30*key; score1 = x1+x2+x3;output;end;run; '
			}
		};

		await store.runAction(session, actionPayload);

		let payload = {
			from: 1,
			count: 1,
			format: true,
			table: { caslib: 'casuser', name: 'score' }
		};

		let result = await casFetchData(store, session, payload);
		 console.log('The next start is at:' + result.pagination.toString());
		//  console.log(result.data.rows[0].toString());

		while (result.pagination.next.from !== -1) {
			 console.log('The start is at: ' + result.pagination.next.from);
			 result = await casFetchData(store, session, result.pagination.next);
			 console.log('The next start is at:' + result.pagination);
		};
		 console.log('--------------------------------------- scroll backwards');

		while (result.pagination.prev.from !== -1) {
			 console.log('The start is at: ' + result.pagination.prev.from);
			 result = await casFetchData(store, session, result.pagination.prev);
			 console.log('The next start is at:' + result.pagination);
		};
		await store.apiCall(session.links('delete'));
	};
}
