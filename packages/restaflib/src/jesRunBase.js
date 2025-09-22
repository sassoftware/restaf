/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import jesSummary from  './jesSummary';
//
// Notes: Run jobExecution service
//
/** 
 * @description Reduce jobExecution service to an consummable form(async)
 * @private
 * @module jesRunBase
 * 
 * @param {object} store - restaf store
 * @param {object} payload - payload for the jobExecution service
 * 
 * @returns {object}  results from a sas jobExecution job in a consumable form
 * 
 */

async function jesRunBase ( store, payload ){
    let {jobExecution}= await store.addServices( 'jobExecution' );
    
    let job    = await store.apiCall( jobExecution.links( 'create' ), payload );
    
    let status = await store.jobState( job, null, 5, 2 );
    
    
    if ( status.data === 'running' ) {
        throw `ERROR: Job did not complete in allotted time`;
    } else if ( status.data === 'failed' ) {
        throw JSON.stringify( status );
    } else {
        
        let results = await jesSummary ( store, status.job );
        return results;
        }
}
export default jesRunBase;

