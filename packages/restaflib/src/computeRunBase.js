/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import computeSummary from  './computeSummary';
/**
 * @description Reduce compute service to an consummable form(async)
 * @private
 * @async
 * @module computeRunBase
 * 
 * @param {object} store - restaf store
 * @param {object} session - compute service session
 * @param {code} code - SAS code to be executed
 * 
 * @returns {object} computeSummary Object
 * 
 */

async function computeRunBase (store, session, code, maxTime, delay){

    let maxTries = 'wait';
    let realDelay = (delay != null) ? delay : 0.25;
   
    if (maxTime !== 'wait' && maxTime  != null ) {
      maxTries = Math.max(Math.floor(maxTime / realDelay), 1);
    }
   
    let payload  = {
        data: {code: code}
    };
    // Now execute the data step and wait for completion

    let job = await store.apiCall(session.links('execute'), payload);

    let status = await store.jobState(job, null, maxTries, realDelay);
   
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let results = await computeSummary(store, session, status.job);
        results.SASJobStatus = status.data;
     
        return results;
        }
}
export default computeRunBase;

