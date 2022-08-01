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
 * @param {object} [args] optional - args to be passed on as macros
 * @param {number} [timeout] optional  - long polling timeout in seconds
 * @returns {promise} computeSummary object
 * 
 */
import computeRunBase from './computeRunBase';
async function computeRun (store,session, src, args, timeout){
 
    // generate macro variables

    
    let code =[];
    if (args != null) {
        for (let arg in args) {
            let c = `%let ${arg} = ${args[arg]};`;
            code.push(c);
        }
    }
 
    // Concat macro to code
    let asrc = src.split(/\r?\n/);
    code = code.concat(asrc);

    // run code and get results
    
    let resultSummary = await computeRunBase(store, session, code, timeout);
    return resultSummary;
}
export default computeRun;