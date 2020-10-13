/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/ 
 
 /*
  *  Reduce the job information into consummable form(async)
  * 
  * @async
  * @module computeSummary
  * 
  * @param {object} store - restaf store
  * @param {object} job - rafObject representing the compute service job
  * 
  * @returns {object} - the computeSummary object for easy handling of logs,listing,ods, tables
  */
async function jesSummary (store, job){

    return job;

}
export default jesSummary;

