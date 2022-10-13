/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import caslRun from './caslRun';

/**
 *
 * @description Save a cas table with replace by default
 * 
 * @async
 * @module casLoadTable
 * @category restaflib/cas
 * @param {store} store     restaf store
 * @param {session} session cas session
 * @param {casTable} table cas table to be loaded
 * 
 * @returns {promise}  returns status object
 */
async function casLoadTable (store, session, table){

  const src = `
       rc = checkAndLoadTable(_args_.caslib, _args_.name);
	   if (rc ne true) then do;
			text = 'Unable to access ' ||caslib||'.'||name;   
			rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
			exit(rx);  
	   end; 
	   print 'return code = ' || rc;
	   action table.tableExists r=result/    
	   caslib = _args_.caslib    
	   name  = _args_.name;    
	   print result;
	   send_response ({casResults= {status = 'ok'}});
  `;
  
  const r = await caslRun(store,session, src, table, true);
  console.log(JSON.stringify(r, null,4));
  return {msg: `${table.caslib}.${table.name} loaded}`, statusCode: 0};
}
export default casLoadTable;