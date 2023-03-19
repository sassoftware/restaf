/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
async function saveTable (store, session, caslib, name){
   let  payload = {
		action: 'table.save',
		data  : {
			name   : `${name}`,
			caslib : `${caslib}`,
			replace: true,
			table  : { name: `${name}`, caslib: `${caslib}` }
		}
	};

   await store.runAction(session, payload);
}
export default saveTable;