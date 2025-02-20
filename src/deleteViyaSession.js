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
  if (logonPayload == null  || source == null || source.trim().length === 0) {
    return null;
  }
  
  source = source.toLowerCase();
  
  if (appEnv.currentSessions[source].session !== null) {
    let lapp = appEnv.currentSessions[source];
    let session = lapp.session;
    if (lapp.userSessionID == null) {
      console.log('Deleting session', lapp.sessionID);
       await store.apiCall(session.links('delete'));
    } else {
      console.log('User session not deleteed');
    }
    
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