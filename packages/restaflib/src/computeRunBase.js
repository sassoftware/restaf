/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import computeSummary from  './computeSummary';
/**
 * @description Reduce compute service execution results
 * @private
 * @async
 * @module computeRunBase
 * 
 * @param {object} store - restaf store
 * @param {object} session - compute service session
 * @param {code} code - SAS code to be executed
 * @param {int} timeout optional - timeout for long poll in seconds(default= 5)

 * 
 * @returns {object} computeSummary Object
 * 
 */

async function computeRunBase (store, session, code, timeout,eventHandler,userContext){
   
    let payload  = {
        data: {code: code}
    };
    // Now execute the data step and wait for completion

    let job = await store.apiCall(session.links('execute'), payload);

    let p = {
        qs: {
          wait : (timeout != null) ? timeout : 5
        },
        headers: {
            "If-None-Match": job.headers('etag')
        }
    }
    let status = await store.jobState(job, p, 'longpoll', 0, eventHandler,userContext);
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let results = await computeSummary(store, session, status.job);
        results.SASJobStatus   = status.data;
        results.jobStateStatus = status;
     
        return results;
        }
}
export default computeRunBase;

