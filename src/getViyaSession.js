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

async function getViyaSession(appEnv, source) {
 // let {casSetup, computeSetup} = restaflib;
  let {appConfig, store} = appEnv;
  // if it is already created, return it
  ;
  if (appConfig.logonPayload == null ) {
    return null;
  }
  
  let tappEnv=  {
    host: appConfig.logonPayload.host,
    logonPayload: appConfig.logonPayload,
    source: source,
    builtins: appEnv.builtins,
    store:  store,
    session: null,
    servers: null,
    serverName: null,
    casServerName: null,
    sessionID: null,
    restaflib: appEnv.builtins.restaflib,
    restafedit: appEnv.builtins.restafedit
  }
 
  if (source === null) {
    return tappEnv;
  }

  source = source.toLowerCase();
  if (source === 'sas') {source = 'compute'};
 

  if (['cas','compute'].includes(source) === false) {
    return tappEnv;
  }
  
  if (appEnv.currentSessions[source].sessionID != null) {
    tappEnv = setupAppEnv(appEnv, tappEnv, source);
    return tappEnv;
  }

  // source = cas
  if (source === "cas") {
    
    let { session, servers } = await casSetup(store, null);
    
    let casServerName = session.links("execute", "link", "server");
    appEnv.currentSessions.cas = {
      session: session,
      servers: servers,
      casServerName: casServerName,
      serverName: casServerName
    };
    let ssid = await store.apiCall(session.links("self"));
    appEnv.currentSessions.cas.sessionID = ssid.items("id");

    tappEnv = setupAppEnv(appEnv, tappEnv, source);

    return tappEnv;
  }

  // source = sas
  if (source === 'compute') {
    let session = await computeSetup(store, null);
    let sid = await store.apiCall(session.links("self"));
    appEnv.currentSessions.compute = {
      session: session,
      servers: null,
      serverName: null,
      sessionID: sid.items("id")
    };
    tappEnv = setupAppEnv(appEnv, tappEnv, source);
    return tappEnv;
  }
  function setupAppEnv(appEnv, tappEnv, source) {
      let lapp = appEnv.currentSessions[source];
      tappEnv.source = source;
      tappEnv.session = lapp.session;
      tappEnv.servers = lapp.servers;
      tappEnv.serverName = lapp.serverName;
      tappEnv.casServerName = lapp.casServerName;
      tappEnv.sessionID = lapp.sessionID;
    return tappEnv;
  }
}
export default getViyaSession;