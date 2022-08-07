/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

/**
 * @member compute
 * @description Prepare data for runCompute(@async)
 * @async
 * @module computeRun
 * @category restaflib/compute
 * 
 * @param {store} store - restaf store
 * @param {rafObject} session - current compute service session
 * @param {string} src  - code to execute
 * @param {object=} macros  - macros as a json
 * @param {number=} timeout  - long polling timeout in seconds
 * @param {function=} checkStatus - callback to check on status
 * @param {object=} userContext - this is passed to the statusHandler 
 * @returns {promise} computeSummary object. Job Status is computeSummary.SASJobStatus
 * @example
 *   The job status will be one of these  completed|warning|error|failed
 *   Typical call:
 *      let computeSummary = await computeRun(store,computeSession, src, args);
 * 
 *   Advanced call: If you want to track the job pass a checkStatus function with some context
 
     const checkStatus = (currentStatus, userContext) => {
         console.log('currentStatus', currentStatus);
         console.log('userContext ', userContext);
        // do something useful - like in an UI display status for user 
        return false;
     } // return true if you want to stop waiting on the job. Does not cancel the job
 
===============================================

* A simple example

    async function runtest(store, logonPayload) {
        let computeSession = await restaflib.computeSetup(store, null, logonPayload);
        let macros = {
            data: 'sashelp.cars'
        };
        let src = `
                ods html style=barrettsblue;  
                proc print data=&data;run;
                ods html close; 
                run;
                `;
 
        let computeSummary = await restaflib.computeRun(
            store,
            computeSession,
            src,
            macros
        );
        console.log('Job Status: ', computeSummary.SASJobStatus);

         let log = await restaflib.computeResults(store, computeSummary, "log");
        let ods = await restaflib.computeResults(store, computeSummary, "ods");
        return 'done';

    }

 */

import computeRunBase from './computeRunBase';
async function computeRun (store,session, src, macros, timeout,checkStatus, userContext){
 
    // generate macro variables
    let code =[];
    if (macros != null) {
        for (let arg in macros) {
            let c = `%let ${arg} = ${macros[arg]};`;
            code.push(c);
        }
    }
 
    // Concat macro to code
    let asrc = src.split(/\r?\n/);
    code = code.concat(asrc);

    // run code and get results
    let resultSummary = await computeRunBase(store, session, code, timeout, checkStatus, userContext);
    return resultSummary;
}
export default computeRun;