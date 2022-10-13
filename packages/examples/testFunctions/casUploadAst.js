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

let restaflib = require('@sassoftware/restaflib');
let { casSetup, casUpload, caslDescribe} = restaflib;

module.exports = async function casUploadAst (save, testInfo) {
	let { store, logger } = testInfo;

	let { session } = await casSetup(store, null);
	
	let r = await casUpload(
		store,
		session,
		'./data/paysimsvdd.sasast',
		'casuser.paysimjest',
		save
	);

	let scenario = {
		model   : { caslib: 'casuser', name: 'paysimjest' },
		scenario: {
			type_n        : 1,
			amount        : 10000,
			newbalanceDest: 1000,
			newbalanceOrig: 1000,
			oldbalanceDest: 1000,
			oldbalanceOrg : 1000,
			isFraud       : 0
		}
	};

	r = await caslDescribe(store, session, scenario);

	let desc = r.casResults.describe;

	logger.info(desc);
	await store.apiCall(session.links('delete'));

	return desc;

};