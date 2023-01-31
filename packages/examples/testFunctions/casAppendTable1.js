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

let { casSetup, casUpload, casAppendTable} = restaflib;

let fs = require('fs');

module.exports = async function casAppendTable1 (testInfo, save) {
	let { store, logger } = testInfo;
	let { session } = await casSetup(store, null);

	let altsrc = readFile('testdata', 'csv');
	let output = 'casuser.dtemp1';

	debugger;

	let r = await casUpload(
		store,
		session,
		null,
		output,
		save,
		altsrc
	);
	console.log(r);

	console.log('append to table');
	let [caslib,name] = output.split('.');
	let inputTable = {caslib: caslib, name: name};
	let outputTable = {caslib: 'casuser', name: 'testdata'};
	console.log(inputTable, '    ', outputTable);
	
	r = await casAppendTable(store, session, inputTable, outputTable, true)
	console.log(r);
	await store.apiCall(session.links('delete'));
	return 'done';
};

function readFile (filename, fileType) {
	let data = fs.readFileSync(`../../data/${filename}.${fileType}`, 'utf-8');
	console.log(data);
	return data;
  }