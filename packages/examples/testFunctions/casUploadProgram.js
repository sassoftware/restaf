/* eslint-disable no-control-regex */
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

let fs = require('fs');
let restaf = require('@sassoftware/restaf');
let { casSetup, print } = require('@sassoftware/restaflib');

module.exports = async function casUploadProgram () {
	let payload = require('../lib/config.js/index.js')();
	let store = restaf.initStore();
	let { session } = await casSetup(store, payload);
	let filename = 'Cluster_SDOH1';
	let fileType = 'sas';
	let outputName = filename + 'jest';

	// setup header for upload and the rest of the payload
	let JSON_Parameters = {
		casout: {
			caslib: 'casuser' /* a valid caslib */,
			name  : outputName /* name of output file on cas server */
		},

		importOptions: {
			fileType : 'csv' /* type of the file being uploaded */,
			delimiter: '\\'
		}
	};

	let p = {
		headers: { 'JSON-Parameters': JSON_Parameters },
		data   : readFile(filename, fileType),
		action : 'table.upload'
	};

	await store.runAction(session, p);

	p = {
		action: 'table.fetch',
		data  : { table: { caslib: 'casuser', name: outputName } }
	};

	let actionResult = await store.runAction(session, p);
	// print.object(actionResult.items('tables'), 'Fetched data');
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;

	await store.apiCall(session.links('delete'));

	return t;
};

function readFile (filename, fileType) {
	let isrc = fs.readFileSync(`./${filename}.${fileType}`, 'UTF8');
	isrc = isrc.replace(/[^\x00-\x7F]/g, '');
	let src = isrc.replace(/\r?\n/g, '');
	let csv = 'modelName\\datastepSrc\n';
	csv = csv + 'testModel' + '\\' + src + '\n';
	console.log(csv);
	return csv;
}
