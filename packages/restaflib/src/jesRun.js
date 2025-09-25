/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import jesRunBase from './jesRunBase';
/**
 * @description Prepare data for runCompute(@async)
 * @private
 * @module spBase
 * 
 * @param {object} store - restaf store
 * @param {string  jobDefinition - jogdefinition name
 * @param {object} args - arguments to pass to the job definition
 * 
 * @returns {object} computeSummary object
 * 
 */

async function jesRun(store, jobDefinitionName, args, jobDef) {

    // generate macro variables

    let jobRequest = {};
    //jobRequest.type = 'Compute';

    let jobDefinition = {};
    jobRequest.jobDefinitionUri = (jobDef != null) ? jobDef : await jobDefUri(store, jobDefinitionName);

    // jobDefinition.type ='Compute';
    jobRequest.arguments = args;

    let payload = {
        data: jobRequest
    };
    // run code and get results
    debugger;
    let jobResult = await jesRunBase(store, payload);
    return jobResult;
}

async function jobDefUri(store, name) {
    let { jobDefinitions } = await store.addServices('jobDefinitions');
    let uri = null;
    let payload = {
        qs: {
            filter: `eq(name,'${name}')`
        }
    };

    let rafLink = jobDefinitions.links('job-definitions');
    try {
        let jdefList = await store.apiCall(rafLink, payload);

        if (jdefList.itemsList().size === 0) {
            throw `Error: ${name} not found in the system`;
        }
        else {
            uri = jdefList.itemsCmd(name, 'self', 'link', 'uri');
        }

        return uri;
    } catch (e) {
        throw `Error: ${name} not found in the system`;
    }
}
export default jesRun;