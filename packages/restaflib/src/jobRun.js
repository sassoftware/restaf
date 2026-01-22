/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
;


/**
 * @description Prepare data for runCompute(@async)
 * @private
 * @module jobRun
 * 
 * @param {object} store - restaf store
 * @param {string} jobName - name of the job
 * @param {object} args - arguments to pass to the job definition
 * 
 * @returns {promise} - returns scoring results
 * 
 */
import jesSummary from './jesSummary.js';
async function jobRun(store, jobName, args) {
  let { jobExecution } = await store.addServices('jobExecution');

  let payload = {
    qs: {
      filter: `eq(name,'${jobName}')`
    }
  };
  try {
    //find job 
    let thisJob = await store.apiCall(jobExecution.links('jobs'), payload);
    // extract the jobDefinition
    if (thisJob.itemsList().size === 0) {
      throw `Error: ${jobName} not found in the system`;
    }
    let id = thisJob.items(thisJob.itemsList(0), 'data', 'jobRequest', 'jobDefinition');
    //setup job request payload
    let argument = { ...args, _omitSessionResults: false, _resultfile: '*', _output_json: 'json' };
    let jobRequest = {
      data: {
        jobDefinition: id,
        arguments: argument

      }
    };
    // use the submit job link to submit the job
    let job1 = await store.apiCall(thisJob.links('submitJob'), jobRequest);
   
    let status = await store.jobState(job1, null, 'wait', 2);
    if (status.data === 'running') {
      throw `ERROR: Job did not complete in allotted time.`;
    } else if (status.data === 'failed') {
      throw `ERROR: Job failed. See SAS Environment for details.`;
    } else {
      let results = await jesSummary(store, status.job);
      return results;
    }
  } catch (e) {
    throw e;
  }
}
export default jobRun;