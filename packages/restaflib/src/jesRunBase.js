/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
;
import jesSummary from './jesSummary.js';
//
// Notes: Run jobExecution service
//
/** 
 * @description Reduce jobExecution service to an consummable form(async)
 * @private
 * @module jesRunBase
 * 
 * @param {object} store - restaf store
 * @param {object} payload - payload for the jobExecution service
 * 
 * @returns {promise}  results from a sas jobExecution job in a consumable form
 * 
 */

async function jesRunBase(store, payload) {
  let { jobExecution } = await store.addServices('jobExecution');
  
  try {
    let job = await store.apiCall(jobExecution.links('create'), payload);
    let status = await store.jobState(job, null, 'wait', 2);

    if (status.data === 'running') {
      throw `ERROR: Job did not complete in allotted time`;
    } else if (status.data === 'failed') {
      throw JSON.stringify(status);
    } else {
      let results = await jesSummary(store, status.job);
      results.status = status.data;
      return results;
    }
   } catch (error) {
    throw `Error: ${error}`;
  }
}
export default jesRunBase;

