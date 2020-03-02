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

'use strict';

let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');
let { casSetup, casUpload, caslDescribe, caslScore, print } = restaflib;

module.exports = async function casUploadAstore2(save) {
	let payload = require('./config.js')();
	let store = restaf.initStore();
	let { session } = await casSetup(store, payload);
	debugger;
	let r = await casUpload(
		store,
		session,
		'./data/paysimsvdd.sasast',
		'casuser.paysimjest',
		save
	);

	let scenario = {
		model: { caslib: 'casuser', name: 'paysimjest' },
		scenario: {
			type_n : 1,
			amount : 10000,
			newbalanceDest: 1000,
			newbalanceOrig: 1000,
			oldbalanceDest: 1000,
			oldbalanceOrg: 1000,
			isFraud      : 0
			}
		};

    r = await caslDescribe(store, session, scenario);

	let desc = r.casResults.describe;

	print.object(desc, 'describe');
	r = await caslScore(store, session, scenario);

	print.object(r, 'score');
	let result = {
		describe: desc,
		score   : r
	}

	return result;
	
	/*
	let actionPayload = {
		action: 'table.fetch',
		data: {
			table: {
				caslib: 'casuser',
				name: 'lenet_snzrlejest'
			}
		}
	};
	let actionResult = await store.runAction(session, actionPayload);
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	await store.apiCall(session.links('delete'));
	return t;
	*/
};
