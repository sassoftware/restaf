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

module.exports = async function masScore (save, testInfo) {
	let { store, logger } = testInfo;
	let models = [process.env.MASMODEL];
	let masControl = await restaflib.masSetup(store, models);
	let desc = masDescribe(masControl, models[0], null);
	let scenario = desc.map((m) => {
		m.value = 1.5;
		return m;
	});
	logger.info(scenario);
	let result = await masRun(store, masControl, models[ 0 ], scenario);
	logger.info(result);
	return 'done';
};
