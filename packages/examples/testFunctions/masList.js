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


module.exports = async function masList (testInfo) {
	let { store, logger } = testInfo;
	let n = process.env.MASMODEL.trim();
	let payload = {
		qs: {
			name: n
		}
	};
	console.log(payload);
	let { microanalyticScore } = await store.addServices('microanalyticScore');
	let modelList1 = await store.apiCall(microanalyticScore.links('modules'));
	console.log(JSON.stringify(modelList1.itemsList(), null, 4));
	let modelList = await store.apiCall(modelList1.links('self'),payload);
	console.log(JSON.stringify(modelList.itemsList(), null, 4));
	console.log(JSON.stringify(modelList.itemsCmd(modelList.itemsList(0)).keySeq()));

	
    let next;

	// do this loop while the service returns the next link
	while ((next = modelList.scrollCmds('next')) !== null) {
		modelList = await store.apiCall(next);
		console.log(JSON.stringify(modelList.itemsList(), null, 4));
		console.log(JSON.stringify(modelList.itemsCmd(modelList.itemsList(0)).keySeq()));
	}
	
	return 'done';
};

