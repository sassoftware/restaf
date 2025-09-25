/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import jobRunBase from './jobRunBase';
/**
 * @description Prepare data for runCompute(@async)
 * @private
 * @module spBase
 * 
 * @param {object} store - restaf store
 * @param {string} jobDefinition - jogdefinition name
 * @param {object} args - arguments to pass to the job definition
 * @param {string} src - source code to run
 * @param {string} jobDefUri - job definition URI to use(overrides jobDefinition name)
 * 
 * @returns {object} computeSummary object
 * 
 */

async function jobRun(store, jobName, args) {
  let { jobExecution } = await store.addServices('jobExecution');

  try {
    let jobDefinitionUri = await findJobDefinition(store, jobExecution, jobName);
    let jobRequest = {
      jobDefinitionUri: jobDefinitionUri,
      arguments: args
    };
    let payload = {
      data: jobRequest
    };
    // jesRun will ignore the jobName and use thejobDefinitionUri
    debugger;
    let jobSummary = await jobRunBase(store, payload);
    return jobSummary;
  } catch (e) {
    throw e;
  }
}
async function findJobDefinition(store, jobExecution, jobName) {
  let uri = null;
  let payload = {
    qs: {
      filter: `eq(name,'${jobName}')`
    }
  };
  let rafLink = jobExecution.links('jobs');

  debugger;

  try {
    let jobList = await store.apiCall(rafLink, payload);
    let id = jobList.itemsList(0);
    let uri = jobList.items(id, 'data', 'jobRequest', 'jobDefinitionUri');
    return uri;

  } catch (e) {
    throw `Error: ${name} not found in the system`;
  }
}

export default jobRun;