/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved *  *  Licensed under the Apache License, Version 2.0 (the "License");
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
 * @description Calls cas server and returns the results(async)
 * 
 * @async
 * @module casSetup
 * @category restaflib/cas
 * @param {store} store         - restaf store
 * @param {logonPayload} logonPayload  - if not null, then use this to logon to Viya
 * @param {string=} sessionID - id of an existing session to attach.
 * @param {string} sasServer - name of cas server to use. else defaults to the first server on list.
 * 
 * @returns {promise}  returns an object {session: xxx, servers: yyy}
 * @example 
 *    const {servers, session} = await casSetup(storem logonPayload, <sessionID>)
 */
'use strict';
async function casSetup( store, logonPayload, sessionID, casServer ) {

	if ( logonPayload != null ) {
		let msg = await store.logon( logonPayload );
	}

	let { casManagement } = await store.addServices( 'casManagement' );
	let servers = await store.apiCall( casManagement.links( 'servers' ) );

	if ( servers.itemsList().size === 0 ) {
		throw { Error: 'No cas servers were found' };
	}
	let casserver = null;
	if ( casServer == null ) {
		casserver = servers.itemsList( 0 );
	} else {
		let itemsList = servers.itemsList().toJS();
		let index = itemsList.findIndex( s => s === casServer );
		if ( index === -1 ) {
			throw { Error: `server with name of ${casServer} was not found` };
		} else {
			casserver = servers.itemsList( index );
		}
	}

	let session = null;
	if ( sessionID == null ) {
		session = await store.apiCall( servers.itemsCmd( casserver, 'createSession' ) );
	} else if ( typeof sessionID === 'object' ) {
		session = sessionID;
	} else {
		const payload = {
			qs: {
				filter: `eq( id,'${sessionID}')`
			}
		};

		console.log('after session' ,JSON.stringify(store.getXsrfData()));
		let sessionList = await store.apiCall( servers.itemsCmd( casserver, "sessions" ), payload );
		if ( sessionList.items().size === 0 ) {
			throw `ERROR: The sessionID ${sessionID} was not found.`;
		}
		let selfcmd = sessionList.itemsCmd( sessionList.itemsList( 0 ), "self" );
		session = await store.apiCall( selfcmd );
	}

	return { servers, session };
}
export default casSetup;



