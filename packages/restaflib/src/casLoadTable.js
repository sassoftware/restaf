/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
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
async function casLoadTable ( store, session, table, _force ){
  const src = `
	  print _args_;
    rc = checkAndLoadTable(_args_.caslib, _args_.name);
		if (rc ne true) then do;
			text = 'Unable to access ' ||_args_.caslib||'.'||_args_.name;   
			rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
			exit(rx);  
		end; 
	  print 'return code = ' || rc;
	  send_response({casResults={status='ok'}});
  `;

  const r = await caslRun( store,session, src, table, true );
  return {msg: `${table.caslib}.${table.name} loaded}`, statusCode: 0};
}
export default casLoadTable;