/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let restaflib = require('@sassoftware/restaflib');
let { computeSetup } = restaflib;

module.exports = async function computeDS (testInfo) {
	let { store, logger } = testInfo;

	let computeSession = await computeSetup(store, null, null);
 
	let macros = { maxRows: 1000 };
	let src = `

        ods html style=barrettsblue; 
        data work.dtemp1;
            array x{10};  
            do j = 1 to &maxRows;  
                do i = 1 to 10;  
				x{i} = j * 10;  
                end;  
            output;  
			put _ALL_;  
            end;  
			run;  
		
			proc print;run;  
			proc print data=sashelp.cars; run;
            ods html close;
			run;
			
            `;
	logger.info('Compute Service');
	console.log(Date());
	const checkStatus = (state, context) => {
		console.log(state);
		context.counter = context.counter + 1;
		
		if (state !== 'completed' && context.counter > 100) {
			context.state = state;
			state = 'exit';
		}
		return state;
	}
	let context = {
		state: '',
		counter: 1
	};
	let computeSummary = await restaflib.computeRun(
		store,
		computeSession,
		src,
		macros,
        1,
		/*
		checkStatus,
		context
		*/

    );
	console.log(computeSummary.SASJobStatus);
	console.log(context);
	console.log(Date());
	
	// let log = await restaflib.computeResults(store, computeSummary, 'log');
	// logger.info(log);
	// let ods = await restaflib.computeResults(store, computeSummary, 'ods');
	// logger.info(ods);

	let tables = await restaflib.computeResults(
		store,
		computeSummary,
		'tables'
	);
	logger.info(tables);
    let data;
	for (let i=0; i <= 10; i++) {
		data = await restaflib.computeFetchData(
			store,
			computeSummary,
			'DTEMP1',
			'next',
			{offset: i, limit:1}
		);
		console.log(data);
		// logger.info(data.columns);
		logger.info(`Row ${i+1}  ${data.rows[0]}`);
	}
	data = await restaflib.computeFetchData(
		store,
		computeSummary,
		'DTEMP1',
		'next',
		{offset: 0, limit:10}
	);
	await store.apiCall(computeSession.links('delete'));
    return data.rows;
};
