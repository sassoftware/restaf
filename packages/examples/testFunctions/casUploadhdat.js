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
let { casSetup, casUpload } = restaflib;

module.exports = async function casUploadbdat (save, testInfo) {
	let { store } = testInfo;
	let { session } = await casSetup(store, null);
	debugger;
	let r = await casUpload(
		store,
		session,
		'./data/GRADIENT_BOOSTING___BAD_2.sashdat',
		'casuser.GRADIENT_BOOSTING___BAD_2jest',
		save
	);
	await store.apiCall(session.links('delete'));
	return 'done';
};
