/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
//
// Notes: Run compute service 
//
/**
 * Reduce compute service to an consummable form(async)
 * @module runCompute
 * 
 * @param {object} sore - restaf store
 * @param {code} code - SAS code to be executed
 * 
 * @returns {object} rafobject of the results from a sas compute job
 * 
 */
let computeSummary = require('./computeSummary');
async function runCompute (store, session, code){

    let payload  = {
        data: {code: code}
    };
    // Now execute the data step and wait for completion
    let job    = await store.apiCall(session.links('execute'), payload);
    let status = await store.jobState(job, null, 5, 2);
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let results = await computeSummary (store, status.job);
        return results;
        }
}
export default runCompute;

