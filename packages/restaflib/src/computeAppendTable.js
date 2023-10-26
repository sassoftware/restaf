/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import computeRun from './computeRun';

/** 
* @description Append a compute table to a master compute table 
* @async
* @module computeAppendTable
* @category restaflib/compute
* @param {store} store   - store
* @param {rafObject} session - compute session
* @param {computeTable} input Input table with new rows {libref: xxx, name: nnn}
* @param {computeTable} output  Master table {computelib: xxx, name: nnn}
* @returns {promise} - return 
* @example
*    let status = restaflib.computeAppendTable(store, session, 'computeuser.temp', 'public.master', true));
*   
*/
async function computeAppendTable ( store, session, input, output ){
    
    const src = `
     proc append base=${output.libref}.{output.name}  
     data= ${input.libref}.${input.name}; run;
     `;
    
     let computeSummary = await computeRun( store, session, src );
    const statusCode = ( computeSummary.SASJobStatus === 'completed' ) ? 0 : 1;
    return {msg: `Append Completed. Status is: ${computeSummary.SASJobStatus}`, statusCode: statusCode };
}
export default computeAppendTable;
