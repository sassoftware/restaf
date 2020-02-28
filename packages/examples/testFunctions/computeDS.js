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

let restaf = require('@sassoftware/restaf');
let restaflib = require('@sassoftware/restaflib');
let { computeSetup, print } = restaflib;

module.exports = async function computeDS () {
    let payload = require('./config')();
    let store = restaf.initStore(); 
	let computeSession = await computeSetup(store, null, payload );

    console.log(computeSession);
    
 
	let macros = { maxRows: 5 };
	let src = `

        ods html style=barrettsblue; 

        data work.dtemp1;
            array x{10};  
            do j = 1 to &maxRows;  
                do i = 1 to 10;  
                x{i} = i * 10;  
                end;  
            output;  
            put _ALL_;  
            end;  
            run;  
            proc print;run;  
            ods html close;
            run;
            ;
            `;

	print.titleLine('Compute Service');

	let computeSummary = await restaflib.computeRun(
		store,
		computeSession,
		src,
		macros
    );
    
	let log = await restaflib.computeResults(store, computeSummary, 'log');
	print.logListLines(log);
	let ods = await restaflib.computeResults(store, computeSummary, 'ods');
	console.log(ods);

	let tables = await restaflib.computeResults(
		store,
		computeSummary,
		'tables'
	);
	print.object(tables, 'List of tables');

	let data = await restaflib.computeFetchData(
		store,
		computeSummary,
		'DTEMP1'
	);
	console.log(data.columns);
	console.log(`First row in set: ${data.rows[0]}`);

	await store.apiCall(computeSession.links('delete'));
    return data.rows;
};
