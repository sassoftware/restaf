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

let restaflib = require('@sassoftware/restaflib');
let { masDescribe, masRun } = restaflib;

module.exports = async function masScore (testInfo) {
	let { store, logger } = testInfo;
	let { microanalyticScore } = await store.addServices('microanalyticScore');
	let modelList1 = await store.apiCall(microanalyticScore.links('modules'));
	console.log(JSON.stringify(modelList1.itemsList(), null, 4));

	// let models = ['LogisticRegression_f726351799f44e2d927a40c950047331'];
	let models = ['machine2_0']
	
	let masControl = await restaflib.masSetup(store, models);
	console.log(JSON.stringify(masControl, 1,4));
	
	let desc = masDescribe(masControl, models[0]);
	console.log(desc);
	
	
	let scenario = {};
	desc.map((d,i) => {
		scenario[d.name] = 100;
	});
	
	logger.info(scenario);
	
	let result = await masRun(store, masControl, models[ 0 ], scenario, null, 'execute');
	logger.info(result);
	console.log(JSON.stringify(result, null,4));
	return 'done';
};
