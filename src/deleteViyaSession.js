/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @description - Delete an existing Viya Session(cas or compute)
 * @async
 * @function deleteViyaSession
 * @param {appControl} appControl - appControl object
 * @param {string} source  - cas|compute
 * @returns {promise} - appEnv - return true
 * @example - Used for cleanup of app session
 */

async function deleteViyaSession(appEnv, source) {
  let {logonPayload, store} = appEnv;
  // if it is already created, return it
  if (logonPayload == null  || logonPayload.host === null || logonPayload.host === 'none'|| source == null || source.trim().length === 0) {
    return true;
  }
  source = source.toLowerCase();
  if (['cas', 'compute'].indexOf(source) === -1) {
    return true;
  }

  let lapp = appEnv.currentSessions[source];
  if (lapp.sessionID == null) {
    return true;
  }

  console.log('DeleteViyaSession: Deleting session', lapp.sessionID, ' ', lapp.userSessionID);
  if (lapp.userSessionID !== lapp.sessionID) {
    let session = lapp.session;
    console.log('deleteViyaSession: Deleting temporary session', lapp.sessionID);
    lapp.session = null;
    lapp.servers = null;
    lapp.serverName = null;
    lapp.casServerName = null;
    lapp.sessionID = null;
    lapp.userSessionID = null;
    await store.apiCall(session.links('delete'));
  } else {
    console.log(`DeleteViyaSession: User session ${lapp.userSessionID} not deleted`);
    lapp.session = null;
    lapp.servers = null;
    lapp.serverName = null;
    lapp.casServerName = null;
    lapp.sessionID = null;
    lapp.userSessionID = null;
    

  }
   
  return true;
}
export default deleteViyaSession;