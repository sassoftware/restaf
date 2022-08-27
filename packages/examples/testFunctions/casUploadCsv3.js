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
let { casSetup, casUpload} = restaflib;
let fs = require('fs');

module.exports = async function casUploadCsv3 (save, testInfo) {
	let { store, logger } = testInfo;
	let { session } = await casSetup(store, null);
	let altsrc = readFile('testdata', 'csv');
	debugger;
	let r = await casUpload(
		store,
		session,
		null,
		'casuser.carsnew1',
		save,
		altsrc
	);
	// run fetch action
	debugger;
	console.log(r);
	let actionPayload = {
		action: 'table.fetch',
		data  : {
			table: {
				caslib: 'casuser',
				name  : 'carsnew1'
			}
		}
	};
	debugger;
	let actionResult = await store.runAction(session, actionPayload);

	logger.info(actionResult.items('tables'));
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	await store.apiCall(session.links('delete'));
	return t;
};

function readFile (filename, fileType) {
	let data = fs.readFileSync(`./data/${filename}.${fileType}`, 'utf-8');
	console.log(data);
	return data;
  }