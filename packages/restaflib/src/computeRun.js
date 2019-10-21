/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

/**
 * Prepare data for runCompute(@async)
 * @module spBase
 * 
 * @param {object} store - restaf store
 * @param {object} session - current compute service session
 * @param {string} src  - code to execute
 * @param {object} args - args to be passed on as macros
 * 
 * @returns {object} computeSummary object
 * 
 */
import computeRunBase from './computeRunBase';
async function computeRun (store,session, src, args){
 
    // generate macro variables

    debugger;
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
    debugger;
    let resultSummary = await computeRunBase(store, session, code);
    return resultSummary;
}
export default computeRun;