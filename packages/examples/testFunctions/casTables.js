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

let { casSetup, print } = require('@sassoftware/restaflib');

module.exports = async function casTables (testInfo) {
	let { store, logger } = testInfo;
	let { servers, session } = await casSetup(store, null);

	// get list of caslibs
	let casServer = servers.itemsList(0);
	let caslibs = await store.apiCall(servers.itemsCmd(casServer, 'caslibs'));

	logger.info(caslibs);

	let executeCmd = session.links('execute');

	for (let i = 0; i < caslibs.itemsList().size; i++) {
		let s = caslibs.itemsList(i);
		let parms = {
			allFiles: true,
			caslib  : s
		};
		let p = {
			action: 'table.fileInfo',
			data  : parms
		};
		let tables = await store.apiCall(executeCmd, p);

		logger.info(`caslib: ${s}`);
		logger.info(tables, `${s}`);
	}

  logger.info('Tables by caslib');
  let result = {};

	for (let i = 0; i < caslibs.itemsList().size; i++) {
		let s = caslibs.itemsList(i);
		let tb = caslibs.itemsCmd(s, 'tables');

		let tables = await store.apiCall(tb);
		logger.info(tables);
		if (s === 'SystemData') {
			result[ s ] = tables.itemsList().toJS();
		}
		if (s === 'Public') {
			logger.info(tables.items(tables.itemsList(0, 'data')));
		}
	}

  return 'done';
};

