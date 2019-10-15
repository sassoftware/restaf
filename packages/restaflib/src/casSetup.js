/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
/**
 *
 * Calls cas server and returns the results(async)
 * 
 * @async
 * @module casSetup
 * 
 * @param {object} store         - restaf store
 * @param {object} logonPayload  - if not null, then use this logon

 * 
 * @returns {object}  returns an object {session: xxx, servers: yyy}
 */
'use strict';
async function casSetup (store, logonPayload) {

	if (logonPayload !== null) {
			await store.logon(logonPayload);
	}
	let {casManagement} = await store.addServices('casManagement');
	let servers = await store.apiCall(casManagement.links('servers'));
	let casserver = servers.itemsList(0);
	let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'));
	return {servers: servers, session: session};
}
export default casSetup;



