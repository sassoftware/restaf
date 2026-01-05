/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
;
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

   let src = `
   table.save /
    replace=true
      table = {caslib="${caslib}" name="${name}"}
    caslib="${caslib}" name="${name}.sashdat";

  /* clean up before promoting the table */
  table.droptable /
      caslib="${caslib}" name="${name}" ;

  /* promote the table to make it available for further analysis */
  table.loadTable status=status r=rc/
    caslib="${caslib}",
    path="${name}.sashdat",
    casout={name="${name}", caslib="${caslib}" promote=True};
    run;
	`;
	
  
	return {msg: `${caslib}.${name} saved}`, statusCode: 0};
}
export default casSaveTable;