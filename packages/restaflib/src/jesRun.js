/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';

/*
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

import jesRunBase from './jesRunBase';

async function jesRun (store,jes, src, jobDefinitionName, args){
 
    // generate macro variables

    let jobRequest = {};
    //jobRequest.type = 'Compute';

    let jobDefinition = {};
    

    if (jobDefinitionName !== null) {
        jobRequest.jobDefinitionUri = await jobDefUri(store, jobDefinitionName);
    }

    // Concat macro to code
    if (src !=- null) {
       jobDefinition.code = src; /*src.split(/\r?\n/);*/
    }

    jobDefinition.type ='Compute';
    /*
    if (args !== null) {
        let props = [];
        for (let r in args) {
			let item = { name: r, value: args[r] };
			props.push(item);
		}
        jobDefinition.properties = props;
    }
    */
    jobRequest.arguments = args;

   
    jobRequest.jobDefinition = jobDefinition;

    let payload = {
        data: jobRequest
    };
    // run code and get results
    
    console.log(JSON.stringify(payload, null,4));
    
    let jobResult = await jesRunBase(store, jes, payload);
    

    return jobResult;
}

async function jobDefUri (store, name) {
    let jobDef = store.getService('jobDefinitions');
    let uri = null;
    let payload = {
        qs: {
            filter: `eq(name,'${name}')`
        }
    };
  
    
    let jdefList = await jesRunBase(store, payload);
    
    if (jdefList.itemsList().size === 0) {
        throw `Error: ${name} not found in the system`;
    } 
    else {
        uri = jdefList.itemsCmd(name, 'self', 'link', 'uri');
    }
    return uri;
}
export default jesRun;