/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * @description Setup access to compute service
 * @async
 * @module computeSetup
 * 
 * @param {object} store       - restaf store
 * @param {string} contextName - name of the context( if null the first context in the list is used)
 * @param {object} payload     - logon payload - If null assumes that logon was done earlier.
 * 
 * @returns {promise} - returns a compute session
 */
async function computeSetup (store, contextName, payload){
    if (payload != null) {
        debugger;
        let msg = await store.logon(payload);
    }

    let {compute} = await store.addServices('compute');
    if (store.store.config.options.computeDirect == null) {
        //TBD: Switch to using filter for contexts -issue is matching long strings
        // or get all the contexts
        let contexts = await store.apiCall(compute.links('contexts'));
        if (contextName == null){
            contextName = 'Job Execution';
        };
        
        contextName = contextName.toLowerCase();
        let index = contexts.itemsList().findIndex(c => c.toLowerCase().indexOf(contextName) >= 0 );
        if (index === -1){
            throw {Error: "Compute Context not found: " + contextName};
        }
        let createSession = contexts.itemsCmd(contexts.itemsList(index), 'createSession');
        let session       = await store.apiCall (createSession);
        return session;
    } else {
        let session = await store.apiCall(compute.links('createSession'));
        return session;
    }
}
export default computeSetup;

