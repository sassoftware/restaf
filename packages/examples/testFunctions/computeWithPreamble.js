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
let { computeSetup, computeSetupTables} = restaflib;

module.exports = async function computeWithPreamble (testInfo) {
	let { store, logger } = testInfo;

	let computeSession = await computeSetup(store, "SAS Studio compute context", null);
	const preamble = `libname test '/mnt/viya-share/data/deva';run;`;

	logger.info('Compute Service Tables');
	let t = {libref: 'TEST', name: 'TESTDATA'};
	debugger;
	
	let tableSummary = await computeSetupTables(store, computeSession, t, preamble);
	debugger;
	let tname = `${t.libref}.${t.name}`;
	debugger;
	let data = await restaflib.computeFetchData(
		store,
		tableSummary,
		tname,
		'first',
		{qs:{start: 0, limit:3}}
	);
	console.log(data.rows);
	await store.apiCall(computeSession.links('delete'));
    return data.rows;
};
