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
 // let {casSetup, computeSetup} = restaflib;
  let {appConfig, store} = appEnv;
  // if it is already created, return it
  if (appConfig.logonPayload == null  || source == null || source.trim().length === 0) {
    return null;
  }
  
  source = source.toLowerCase();
  
  if (appEnv.currentSessions[source].session != null) {
    let session = appEnv.currentSessions[source].session;
    await store.apiCall(session.links('delete'));
    
    let lapp = appEnv.currentSessions[source];
    lapp.session = null;
    lapp.servers = null;
    lapp.serverName = null;
    lapp.casServerName = null;
    lapp.sessionID = null;
    
  }
  return true;
}
export default deleteViyaSession;