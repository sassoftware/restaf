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
  let {appConfig, store} = appEnv;
  // if it is already created, return it
  if (appConfig.logonPayload == null  || source == null || source.trim().length === 0) {
    return null;
  }
  
  source = source.toLowerCase();
  
  if (appEnv.currentSessions[source].session !== null) {
    let lapp = appEnv.currentSessions[source];
    let session = lapp.session;
    if (lapp.userSessionID === null) {
       await store.apiCall(session.links('delete'));
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