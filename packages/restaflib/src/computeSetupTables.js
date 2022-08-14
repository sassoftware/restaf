/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import computeSummary from "./computeSummary";
import computeRun from './computeRun';
import computeResults from './computeResults';

/**
 * @description Setup access to compute service
 * @async
 * @module computeSetup
 * @category restaflib/compute
 * 
 * @param {store} store - restaf store
 * @param {session} SAS  compute Session
 * @param {tables} tables Tables to be setup{libref:xx,name:xxx} or array of this object 
 * @param {string} preamble SAS code to execute before setup
 * @returns {promise} - returns a compute summary 
 */
async function computeSetupTables(store, session, tables, preamble){
    debugger;
    if (preamble != null) {
        const result = await computeRun(store, session, preamble);
        if (result.SASJobStatus !== 'completed') {
          throw `Error: Preamble failed with completion code of ${result.SASJobStatus}`;
        }
        debugger;
      }
    let r = await computeSummary(store, session, null, tables);
    return r;
}
export default computeSetupTables;

