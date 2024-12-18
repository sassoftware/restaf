/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
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
 * @param {boolean=} loadTable load table (default= true)
 * 
 * @returns {promise}  returns status object
 */
async function casSaveTable ( store, session, table, replace, loadTable ){
  const {caslib, name} = table;

   let  payload = {
		action: 'table.save',
		data  : {
			name   : `${name}`,
			caslib : `${caslib}`,
			replace: ( replace === false ) ? false : true,
			table  : table
		}
	};
  await store.runAction( session, payload );
	return {msg: `${caslib}.${name} saved}`, statusCode: 0};
}
export default casSaveTable;