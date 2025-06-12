/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
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
async function computeSetup( store, contextName, payload, sessionPayload, sessionID ) {
    if ( sessionID != null && typeof sessionID === 'object' ) { /* passed in restaf session object itself */
        return sessionID;
    }
    // if null, assumes that the logon was done earlier
    if ( payload != null ) {
        let msg = await store.logon( payload );
    }
    let {compute} = await store.addServices( 'compute' );
    // Not PUP
    let session = null;
    // Use user specified session
    if ( sessionID != null ) {
        let p = {
            start: 0,
            limit: 100, 
            qs   : {
                filter: `eq(id,'${sessionID}')`
            }
             
        };
        let sessionList = await store.apiCall( compute.links( 'sessions' ), p );
        let index = sessionList.itemsList().toJS().indexOf(sessionID);
        if (index < 0) {
            throw `ERROR: The sessionID ${sessionID} was not found.`;
        }
        let selfcmd = sessionList.itemsCmd( sessionList.itemsList(index), "self" );
        session = await store.apiCall( selfcmd );
        return session;
    }

    // workbench case - computeServerId is set in options
    if ( store.store.config.options.computeServerId != null ) {
        console.log('NOTE: Detected Workbench');
        session = await store.apiCall( compute.links( 'createSession' ) );
        return session;
    }

    // create a session - most common case
    
    if ( contextName == null ) {
        contextName = 'SAS Job Execution compute context';
    }
    let p = {
        qs: { filter: `contains(name,'${contextName}')` }
    };
    let contexts = null;
    try {
      contexts = await store.apiCall( compute.links( "contexts" ), p );
      if ( contexts.itemsList().size === 0 ) {
        throw `Context ${contextName} not found`;
      }
    }
    catch ( err ) {
        console.log('Error: Not able to get context');
        throw err;
    }

    let name = contexts.itemsList( 0 );

    if ( sessionID == null ) {
        p = ( sessionPayload == null ) ? null : sessionPayload;
        let createSession = contexts.itemsCmd( name, 'createSession' );
        session = await store.apiCall( createSession, sessionPayload );
        
    }  
    return session;
}
export default computeSetup;

