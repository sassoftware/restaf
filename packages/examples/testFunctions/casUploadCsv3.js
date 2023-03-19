/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved *   Licensed under the Apache License, Version 2.0 (the 'License');
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

let { casSetup, casUpload, caslRun} = restaflib;

let fs = require('fs');

module.exports = async function casUploadCsv3 (save, testInfo) {
	let { store, logger } = testInfo;
	let { session } = await casSetup(store, null);
	let altsrc = readFile('cars', 'csv');
	let output = 'casuser.dtemp1';
	
	let dr = await cleanup(store, session, output);
	let r = await upload(
		store,
		session,
		null,
		output,
		save,
		altsrc
	);
	console.log('drop table');
	
	dr = await cleanup(store, session, output);
	console.log(dr);

    console.log('----------------- repeat');
   
	r = await upload(
		store,
		session,
		null,
		output,
		save,
		altsrc
	);

	// run fetch action
	
	let actionPayload = {
		action: 'table.fetch',
		data  : {
			table: {
				caslib: 'casuser',
				name  : 'dtemp1'
			}
		}
	};
	
	let actionResult = await store.runAction(session, actionPayload);

	logger.info(actionResult.items('tables'));
	let t = actionResult.items('tables', 'Fetch').toJS();
	t.attributes.CreateTime.value = 0.0;
	await store.apiCall(session.links('delete'));
	return t;
};

async function cleanup(store, session, table) {
	let [caslib, name] = table.split('.');
	let deleteSrc = `
		action table.dropTable/   
        caslib='${caslib}' name='${name}' quiet=TRUE;   
             
        action table.deleteSource status=src /   
        caslib='casuser' source= '${table}' quiet=TRUE;  
		send_response({csResults = {results= 'data deleted'}})
		`;
	let r = await caslRun(store,session, deleteSrc);
	console.log(r);

}
async function upload (store,	session,file, table,save,altsrc) {
	let r = await casUpload(
		store,
		session,
		file,
		table,
		save,
		altsrc
	);
	console.log('from casupload ' , r);
	return r;
}
function readFile (filename, fileType) {
	let data = fs.readFileSync(`./data/${filename}.${fileType}`, 'utf-8');
	console.log(data);
	return data;
  }