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
let { casSetup, casUpload, caslScore, print } = restaflib;

module.exports = async function casUploadbdat(save) {
	let payload = require('./config.js')();
	let store = restaf.initStore();
	let { session } = await casSetup(store, payload);
	debugger;
	let r = await casUpload(
		store,
		session,
		'./data/GRADIENT_BOOSTING___BAD_2.sashdat',
		'casuser.GRADIENT_BOOSTING___BAD_2jest',
		save
	);
	// run fetch action
	let actionPayload = {
		action: 'table.fetch',
		data: {
			table: {
				caslib: 'casuser',
				name: 'GRADIENT_BOOSTING___BAD_2jest'
			}
		}
	};
	let actionResult = await store.runAction(session, actionPayload);

	// print.object(actionResult.items('tables'), 'Fetched data');
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	let scenario = {
		model   : { caslib: 'casuser', name: 'gradient_boosting___bad_2jest'},
		scenario: {
			LOAN   : 100000,
			VALUE  : 10000,
			JOB    : 'J1', 
			CLAGE  : 100, 
			CLNO   : 20, 
			DEBTINC: 20, 
			DELINQ : 2, 
			DEROG  : 0, 
			MORTDUE: 4000, 
			NINQ   : 1, 
			YOJ    : 10
			}
		};

	r = await caslScore(store, session, scenario);
	print.object(r, 'Scoring Results for a model as astore');
    t.scoreResult = r;
	await store.apiCall(session.links('delete'));
	return t;
};
