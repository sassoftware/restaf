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
/* --------------------------------------------------------------------------------
 * Logon to the Viya server
 * ---------------------------------------------------------------------------------
 */
let restaf = require('@sassoftware/restaf');
let { print, decodeJwt } = require('@sassoftware/restaflib');
module.exports = async function logonTest () {
	let payload = require('../lib/config')();
	payload.keepAlive = null;

	let store = restaf.initStore();
	;
	console.log('in logonTest');
	
	store
		.logon(payload)
		.then(msg => {
			console.log(JSON.stringify(store.connection(), null, 4));
			let token = store.connection().token;
			process.env.VIYA_TOKEN = token;
			let jwt = decodeJwt(token);
			print.object(jwt, 'JWT');
			console.log(`Logon Status: ${msg}`);
			let c = store.connection();
			print.object(c, 'Connection information');
			return 'done';
		})
		.catch(err => console.log(err));

};