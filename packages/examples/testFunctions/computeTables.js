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
let { computeSetup, computeSetupTables,computeRun } = restaflib;

module.exports = async function computeTables (testInfo) {
	let { store, logger } = testInfo;

	let start = new Date();
	let computeSession = await computeSetup(store, null, null, null, null);
	console.log('first session: ',new Date() - start);
	logger.info('Compute Service Tables');
	let t = {libref: 'SASHELP', name: 'AIR'};
	
	start = new Date();
	let tableSummary = await computeSetupTables(store, computeSession, t, null);
	console.log('first table summary ',new Date() - start);
	start = new Date();
	let computeSession2 = await computeSetup(store, null, null, null, computeSession);
	console.log(computeSession2.items('id'));
	console.log('second session ', new Date() - start);
	start = new Date();
	tableSummary = await computeSetupTables(store, computeSession2, t, null);
	console.log('second summary: ', new Date() - start);
	let tname = `${t.libref}.${t.name}`;
	
	let data = await restaflib.computeFetchData(
		store,
		tableSummary,
		tname,
		'first',
		{qs:{limit:3}}
	);
	console.log(data.rows);
	await store.apiCall(computeSession.links('delete'));
  return 'done';
};
