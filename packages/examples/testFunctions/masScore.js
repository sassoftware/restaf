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
let { masDescribe, masRun } = restaflib;

module.exports = async function masScore (testInfo) {
	let { store, logger } = testInfo;
	let models = ['MfgFloorDecision1_0'];
	debugger;
	let masControl = await restaflib.masSetup(store, models);
	console.log(masControl);
	debugger;
	let desc = masDescribe(masControl, models[0]);
	console.log(desc);
	debugger;
	debugger;
	let scenario = {
		days_out_of_service: 1,
		// machine_id: 789531,
		sensor_ratio: 38.5
	}
   
	logger.info(scenario);
	let result = await masRun(store, masControl, models[ 0 ], scenario);
	logger.info(result);
	console.log(JSON.stringify(result, null,4));
	return 'done';
};
