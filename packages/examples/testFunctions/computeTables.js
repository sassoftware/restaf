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
let { computeSetup, computeSetupTables } = restaflib;

module.exports = async function computeTables (testInfo) {
	let { store, logger } = testInfo;

	let computeSession = await computeSetup(store, null, null);
 
	logger.info('Compute Service Tables');
	let t = {libref: 'SASHELP', name: 'AIR'};

	let tableSummary = await computeSetupTables(store, computeSession, t)
	
	// let log = await restaflib.computeResults(store, tableSummary, 'log');
	// logger.info(log);
	// let ods = await restaflib.computeResults(store, tableSummary, 'ods');
	// logger.info(ods);

	let tables = await restaflib.computeResults(
		store,
		tableSummary,
		'tables'
	);
	logger.info(tables);
    let data;
	let tname = `${t.libref}.${t.name}`.toLowerCase();
	for (let i=0; i <= 10; i++) {
		data = await restaflib.computeFetchData(
			store,
			tableSummary,
			tname,
			'next',
			{offset: i, limit:1}
		);
		console.log(data);
		// logger.info(data.columns);
		logger.info(`Row ${i+1}  ${data.rows[0]}`);
	}
	data = await restaflib.computeFetchData(
		store,
		tableSummary,
		tname,
		'first',
		{offset: 0, limit:10}
	);
	console.log(data);
	await store.apiCall(computeSession.links('delete'));
    return data.rows;
};
