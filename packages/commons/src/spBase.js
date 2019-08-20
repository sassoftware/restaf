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
 * @param {object} args - args from graphql server(enhanced)
 * @param {string} src  - code to execute
 * 
 * @returns {object} computeSummary object
 * 
 */
let runCompute = require('./runCompute');
async function spBase (store, args, src){
 
    // generate macro variables

    let code =[];
    for (let arg in args) {
        let c = `%let ${arg} = ${args[arg]};`;
        code.push(c);
    }
 
    // Concat macro to code
    let asrc = src.split(/\r?\n/);
    code = code.concat(asrc);

    // run code and get results
    let resultSummary = await runCompute(store, code);
    return resultSummary;
}
export default spBase;