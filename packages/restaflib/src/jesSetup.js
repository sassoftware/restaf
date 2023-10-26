/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * @description Setup access to compute service
 * @async
 * @module jesSetup
 * @private
 * 
 * @param {object} store       - restaf store
 * @param {object} payload     - logon payload - If null assumes that logon was done earlier.
 * 
 * @returns {object} - returns a jobExecution raf object
 */
async function jesSetup ( store, payload ){
    if ( payload != null ) {
        await store.logon( payload );
    }
    let services = await store.addServices( 'jobExecution', 'compute', 'jobDefinitions' );
    return services.jobExecution;
}
export default jesSetup;

