/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * @description Setup access to compute service
 * @async
 * @module computeSetup
 * @category restaflib/compute
 * 
 * @param {store} store - restaf store
 * @param {string=} contextName name of the context. If not specified|null, defaults to Job Execution context
 * @param {logonPayload=} payload logon payload.If null assumes that logon was done earlier.
 * @param {sessionPayload=} sessionPayload for createSession call
 * @returns {promise} - returns a compute session
 */
async function computeSetup (store, contextName, payload,sessionPayload){
    if (payload != null) {
        let msg = await store.logon(payload);
    }
    
    let {compute} = await store.addServices('compute');
    if (store.store.config.options.computeServerId == null) {
        
        if (contextName == null){
            contextName = 'SAS Job Execution';
        };
        let p = {
            qs: { filter: `contains(name,'${contextName}')`}
          };

        let contexts = await store.apiCall(compute.links("contexts"), p);
        if (contexts.itemsList().size === 0) {
            throw `Context ${contextName} not found`;
        }
        p = (sessionPayload == null ) ? null : sessionPayload;
        let createSession = contexts.itemsCmd(contexts.itemsList(0), 'createSession');
        let session       = await store.apiCall (createSession, sessionPayload);
        
        return session;
    } else {
        let session = await store.apiCall(compute.links('createSession'));
        return session;
    }
}
export default computeSetup;

