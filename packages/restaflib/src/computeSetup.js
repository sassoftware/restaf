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
 * @param {string=} contextName name of the context. If not specified defaults to Job Execution context
 * @param {logonPayload=} payload logon payload.If null assumes that logon was done earlier.
 * @param {sessionPayload=} sessionPayload for createSession call
 * @param {string=} sessionID id of a session to attach
 * @returns {promise} - returns a compute session
 */
async function computeSetup(store, contextName, payload, sessionPayload, sessionID) {
    if (payload != null) {
        let msg = await store.logon(payload);
    }

    let { compute } = await store.addServices('compute');
    // Not PUP
    let session = null;
    // Use user specified session
    if (sessionID != null) {
        if (typeof sessionID === 'object') { /* passed in restaf session object itself */
            return sessionID;
        }
        let p = {
            qs: {
                filter: `eq( id,'${sessionID}')`
            }
        };
        let sessionList = await store.apiCall(compute.links('sessions'), p);
        if (sessionList.items().size === 0) {
            throw `ERROR: The sessionID ${sessionID} was not found.`;
        }
        let selfcmd = sessionList.itemsCmd(sessionList.itemsList(0), "self");
        session = await store.apiCall(selfcmd);
        return session;
    }

    // PuP case
    if (store.store.config.options.computeServerId != null) {
        session = await store.apiCall(compute.links('createSession'));
        return session;
    }

    // create a session - most common case

    if (contextName == null) {
        contextName = 'SAS Job Execution';
    };
    let p = {
        qs: { filter: `contains(name,'${contextName}')` }
    };

    let contexts = await store.apiCall(compute.links("contexts"), p);
    if (contexts.itemsList().size === 0) {
        throw `Context ${contextName} not found`;
    }
    let name = contexts.itemsList(0);
    if (sessionID == null) {
        p = (sessionPayload == null) ? null : sessionPayload;
        let createSession = contexts.itemsCmd(name, 'createSession');
        session = await store.apiCall(createSession, sessionPayload);
    }

    return session;
}
export default computeSetup;

