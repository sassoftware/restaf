/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 *
 * @description Save a cas table with replace by default
 * 
 * @async
 * @module casSaveTable
 * @category restaflib/cas
 * @param {store} store     restaf store
 * @param {session} session cas session
 * @param {casTable} table cas table to be saved
 * @param {boolean=} replace default is replace
 * @param {logonPayload} logonPayload  - if not null, then use this to logon to Viya
 * 
 * @returns {promise}  returns status object
 */
async function casSaveTable (store, session, table, replace){
  const {caslib, name} = table;
   let  payload = {
		action: 'table.save',
		data  : {
			name   : `${name}`,
			caslib : `${caslib}`,
			replace: (replace === false) ? false : true,
			table  : table
		}
	};

   await store.runAction(session, payload);
   return {msg: `${caslib}.${name} saved}`, statusCode: 0};
}
export default casSaveTable;