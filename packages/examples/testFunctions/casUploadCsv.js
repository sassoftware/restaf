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

let fs         = require('fs');
let { casSetup } = require('@sassoftware/restaflib');

module.exports = async function casUploadCsv (testInfo) {
	let { store, logger } = testInfo;

	let { session } = await casSetup(store, null);
	let filename = 'cars';
	let fileType = 'csv';
	let outputName = filename + 'jest';

	// setup header for upload and the rest of the payload
	let JSON_Parameters = {
		casout: {
			caslib: 'casuser' /* a valid caslib */,
			name: outputName /* name of output file on cas server */
		},

		importOptions: {
			fileType: fileType /* type of the file being uploaded */
		}
	};

	let p = {
		headers: { 'JSON-Parameters': JSON_Parameters },
		data: readFile(filename, fileType),
		action: 'table.upload'
	};

	await store.runAction(session, p);

	p = {
		action: 'table.fetch',
		data: { table: { caslib: 'casuser', name: outputName } }
	};

	let actionResult= await store.runAction(session, p);
	logger.info(actionResult.items('tables'));
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	
	await store.apiCall(session.links('delete'));

	return t;
}

function readFile (filename, fileType) {
  let data = fs.readFileSync(`./data/${filename}.${fileType}`);
  return data;
}
