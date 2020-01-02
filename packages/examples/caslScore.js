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
 * Simple echo action example
 */
'use strict';

let restaf = require('@sassoftware/restaf');
let payload = require('./config')();


let store = restaf.initStore();
async function example () {
	await store.logon(payload);

	let {casSetup, print, caslScore } = require('@sassoftware/restaflib');
	let {session} = await casSetup(store);

	// Scoring with model published to a CAS destination
	let scenario = {
		modelName: 'Gradient_Boosting_7adb0404_85e3_474d_9d03_1059ef7ae008',
		model    : { caslib: 'public', name: 'testpublish' },
		scenario : {
			sensor_ratio       : 4.3,
			days_out_of_service: 5
		}
	};
    let r = await caslScore(store, session, scenario);
	print.object(r, 'Scoring Results for a published model');

	// Scoring with a model saved in a modelTable - scoring code is datastep
	scenario = {
		model   : { caslib: 'models', name: 'cms_sdoh_risk_stratification_cluster' },
		scenario: {
			SDOH_Physically_Unhealthy_Days_: 4.3,
			SDOH_Per_Adults_Bachelors      : 19.6,
			SDOH_Unemployment_Rate         : 9.6,
			SDOH_Median_Household_Income   : 45493
		}
	};
	r = await caslScore(store, session, scenario);
	print.object(r, 'Scoring Results for a model as datastep code');
	

	// Scoring with a model saved as an astore
	scenario = {
		model   : { caslib: 'public', name: 'gradient_boosting___bad_2'},
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
}

example()
.then(r => console.log('done'))

	.catch(err => console.log(err));
