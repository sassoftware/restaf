/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the 'License');
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

/*
 * Run a cas data step and then retrieve the created table
 */
'use strict';

let { casSetup} = require('@sassoftware/restaflib');

module.exports = async function casDSandFetch (testInfo) {
	let { store, logger } = testInfo;
	let { session } = await casSetup(store, null);

	let actionPayload = {
		action: 'datastep.runCode',
		data  : {
			single: 'YES',
			code  :
				'data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run; '
		}
	};
	await store.runAction(session, actionPayload);

	// run fetch action
	actionPayload = {
		action: 'table.fetch',
		data  : { table: { caslib: 'casuser', name: 'score', where: ''} }
	};
	let actionResult = await store.runAction(session, actionPayload);
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	logger.info(t);
	await store.apiCall(session.links('delete'));
	return t;
};
