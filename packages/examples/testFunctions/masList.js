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


module.exports = async function masList (testInfo) {
	let { store, logger } = testInfo;
	let { microanalyticScore } = await store.addServices('microanalyticScore');
	let modelList = await store.apiCall(microanalyticScore.links('modules'));
	console.log(JSON.stringify(modelList.itemsList(), null, 4));

	
    let next;

	// do this loop while the service returns the next link
	while ((next = modelList.scrollCmds('next')) !== null) {
		modelList = await store.apiCall(next);
		console.log(JSON.stringify(modelList.itemsList(), null, 4));
	}
	
	return 'done';
};

