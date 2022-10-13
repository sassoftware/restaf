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

	logger.info(caslibs.itemsList());

	let executeCmd = session.links('execute');

	
	let s = caslibs.itemsList(0);
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
	logger.info(tables.items());
	

  logger.info('Tables by caslib');
  let result = {};

	for (let i = 0; i < caslibs.itemsList().size; i++) {
		let s = caslibs.itemsList(i);
		let tb = caslibs.itemsCmd(s, 'tables');

		let tables = await store.apiCall(tb);
		logger.info(tables.itemsList());
	}

   

    let serverName = servers.itemsList(0);
    
    // query for preferred caslib 
    let p1 = {
        qs: {
            filter: `eq(name,Models)`
        }
    };
	let caslibResult = await store.apiCall(servers.itemsCmd(serverName, 'caslibs'), p1);
	console.log(caslibResult.itemsList(0));
	
	/*
	p1 = {
        qs: {
			filter: `eq(name,BASEBALL3)`

        }
    };
	let sel = await store.apiCall(caslibResult.itemsCmd(caslibResult.itemsList(0),'tables'),p1);

	logger.info(sel.items());

	p1 = {
        qs: {
			filter: `eq(name,'BASEBALL')`,
			state : "loaded"
        }
    };
	let tables = await store.apiCall(caslibResult.itemsCmd(caslibResult.itemsList(0),'tables'),p1);
    console.log(tables.raw().toJS());
	let t = await store.apiCall(tables.links('self'));

	console.log(JSON.stringify(t.items(), null,4));
*/

  return 'done';
};

