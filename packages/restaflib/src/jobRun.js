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

async function jobrun ( store, jobName, args, src ){
 
    // generate macro variables
    
    let jobRequest = {};
    //jobRequest.type = 'Compute';

    let jobDefinition = {};
    

    if ( jobName !== null ) {
        jobRequest.jobDefinitionUri = await jobDefUri( store, jobName );
    }

    
    if ( src != null ) {
       jobDefinition.code = src; /*src.split(/\r?\n/);*/
    }

    jobDefinition.type ='Compute';
    jobRequest.arguments = args;

    let payload = {
        data: jobRequest
    };
    // run code and get results
    let jobResult = await jesRunBase( store, payload );
    return jobResult;
}

async function jobDefUri ( store, name ) {
    let {jobExecution} = await store.addServices( 'jobExecution' );
    let uri = null;
    let payload = {
        qs: {
            filter: `eq(name,'${name}')`
        }
    };
   
    let rafLink = jobExecution.links( 'jobs' );
    try {
       let jobList = await store.apiCall(rafLink, payload);
        
        if ( jobList.itemsList().size === 0 ) {
            throw `Error: ${name} not found in the system`;
        } 
        else {
            
            uri = jobList.itemsCmd( name, 'self', 'link', 'uri' );
            
            console.log( `Using job definition ${name} with uri ${uri}` );
        }
        return uri;
    } catch (e) {
        throw `Error: ${name} not found in the system`;
    }
}
export default jobrun;