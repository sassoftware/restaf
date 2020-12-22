/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
//
// Notes: Run compute service 
//
/*
 * Reduce compute service to an consummable form(async)
 * @module jesRunBase
 * 
 * @param {object} sore - restaf store
 * @param {code} code - SAS code to be executed
 * 
 * @returns {object} rafobject of the results from a sas compute job
 * 
 */
import jesSummary from  './jesSummary';
async function jesRunBase (store, jes, payload){
    let job    = await store.apiCall(jes.links('create'), payload);
    let status = await store.jobState(job, null, 5, 2);
    
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else if (status.data === 'failed') {
        throw JSON.stringify(status);
    } else {
        let results = await jesSummary (store, status.job);
        return results;
        }
}
export default jesRunBase;

