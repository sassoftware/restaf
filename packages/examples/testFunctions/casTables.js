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

/*
 * Adding a Service
 */
"use strict";

let restaf = require('@sassoftware/restaf');
let { casSetup, print } = require('@sassoftware/restaflib');

module.exports = async function casTables() {
	let payload = require('./config.js')();
	let store = restaf.initStore();
	let { servers, session } = await casSetup(store, payload);

	// get list of caslibs
	let casServer = servers.itemsList(0);
	let caslibs = await store.apiCall(servers.itemsCmd(casServer, 'caslibs'));

	print.itemsList(caslibs, 'List of caslibs');

	let executeCmd = session.links('execute');

	for (let i = 0; i < caslibs.itemsList().size; i++) {
		let s = caslibs.itemsList(i);
		let parms = {
			allFiles: true,
			caslib: s
		};
		let p = {
			action: 'table.fileInfo',
			data: parms
		};
		let tables = await store.apiCall(executeCmd, p);

		print.titleLine(`caslib: ${s}`);
		print.casTable(tables, `${s}`);
	}

  print.titleLine('Tables by caslib');
  let result = {};

	for (let i = 0; i < caslibs.itemsList().size; i++) {
		let s = caslibs.itemsList(i);
		let tb = caslibs.itemsCmd(s, 'tables');

		let tables = await store.apiCall(tb);
		print.itemsList(tables, `Tables in caslib ${s}`);
		if (s === 'SystemData') {
			result[ s ] = tables.itemsList().toJS();
		};
		if (s === 'Public') {
			print.object(
				tables.items(tables.itemsList(0, 'data')),
				'first table info'
			);
		}
	}

  return result;
};

