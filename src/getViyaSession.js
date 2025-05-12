/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */



import {casSetup, computeSetup} from '@sassoftware/restaflib';

/**
 * @description - Allow functions to create a Viya session on demand(if not already created)
 * @async
 * @function getViyaSession
 * @param {appControl} appControl - appControl object
 * @param {string} source  - cas|compute
 * @returns {promise} - appEnv - return appEnv
 * @example - Delays session creation until needed
 */

async function getViyaSession(appEnv, source, usessionID) {
 // let {casSetup, computeSetup} = restaflib;
  let {store} = appEnv;
  // if it is already created, return it

  //if (appConfig.logonPayload == null ) {
  //  return null;
  //}
  if (appEnv.logonPayload == null || appEnv.logonPayload.host == null ||
     appEnv.logonPayload.host === 'none' || appEnv.workBench === 'NO') {
    console.log('Note: getViyaSession - No Viya Server was specified');
    return null;
  }

  let tappEnv=  {
    host: appEnv.logonPayload.host,
    logonPayload: appEnv.logonPayload,
    source: source,
    builtins: appEnv.builtins,
    store:  store,
    session: null,
    servers: null,
    serverName: null,
    casServerName: null,
    sessionID: null,
    userSessionID: (usessionID != null) ? usessionID : null,
    restaflib: appEnv.builtins.restaflib,
    restafedit: appEnv.builtins.restafedit
  }
 
  if (source === null || appEnv.logonPayload.host === null || appEnv.logonPayload.host === 'none') {
    return null;
  }

  source = source.toLowerCase();
  if (source === 'sas') {source = 'compute'};
 

  if (['cas','compute'].includes(source) === false) {
    return null;
  }
  
  if (appEnv.currentSessions[source].sessionID != null) {
    tappEnv = setupAppEnv(appEnv, tappEnv, source);
    return tappEnv;
  }

  // source = cas
  if (source === "cas") {
    try {
      let { session, servers } = await casSetup(store, null, tappEnv.userSessionID);
      let casServerName = session.links("execute", "link", "server");
      let sid = await store.apiCall(session.links("self"))
      appEnv.currentSessions.cas = {
        session: session,
        servers: servers,
        casServerName: casServerName,
        serverName: casServerName,
        sessionID: sid.items("id"),
        userSessionID: tappEnv.userSessionID
      };
      
      tappEnv = setupAppEnv(appEnv, tappEnv, source);
      return tappEnv;
    } catch (err) {
      console.log(JSON.stringify(err));
      return null;
    }
  }

  // source = sas
  if (source === 'compute') {
    try {
      debugger;
      let session = await computeSetup(store, null, null,null,tappEnv.userSessionID);
      let sid = await store.apiCall(session.links("self"));
      appEnv.currentSessions.compute = {
        session: session,
        servers: null,
        serverName: null,
        sessionID: sid.items("id"),
        userSessionID: tappEnv.userSessionID
      };
      tappEnv = setupAppEnv(appEnv, tappEnv, source);
      return tappEnv;
    } catch (err) {
      console.log(JSON.stringify(err));
      return null;
    }
  }
  function setupAppEnv(appEnv, tappEnv, source) {
      let lapp = appEnv.currentSessions[source];
      tappEnv.source = source;
      tappEnv.session = lapp.session;
      tappEnv.servers = lapp.servers;
      tappEnv.serverName = lapp.serverName;
      tappEnv.casServerName = lapp.casServerName;
      tappEnv.sessionID = lapp.sessionID;
      tappEnv.userSessionID = lapp.userSessionID;
      if (tappEnv.userSessionID === tappEnv.sessionID) {
        console.log('getViyaSession: Attached user session', tappEnv.userSessionID); 
      } 
    return tappEnv;
  }
}
export default getViyaSession;