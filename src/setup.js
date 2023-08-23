/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable prefer-const */

import { initStore } from '@sassoftware/restaf';
import { casSetup, computeSetup, computeSetupTables, caslRun } from '@sassoftware/restaflib';

/*
import getTableSummary from './getTableSummary';
import termApp from './termApp';
*/

/**
 * @description Setup an Edit session
 * @async
 * @module setup
 * @category restafedit/core
 * @param {logonPayload} logonPayload  -information for connecting to Viya
 * @param {appControl} appControl       control information
 * @param {string=} sessionID if specified, this session will be used.Must match source
 * @param {object=} builtins object with builtin functions to use in calculations
 *
 * @returns {promise}  returns appEnv to control the flow
 * @alias module: setup
 * @example
 *  const appEnv = await setup(logonPayload, appControl);
 *  The setup method does the following:
 *    1. Create a session based on the source
 *       - Specify the sessionID if you want to use a session you have created.
 *    2. Optionally run the appInit handler (if specified)
 *    3. Optionally run the preamble code (if specified)
 *    4. Return the appEnv object.
 * 
 *    The appInit handler and the preamble code can be used to setup related information, create
 *    temporary tables etc...
 *
 */
async function setup (logonPayload, appControl, sessionID, builtins, user, userFunctions){
  let storeOptions = (logonPayload.storeOptions != null) ? logonPayload.storeOptions : { casProxy: true };
  // Note: that each setup creates its own store
  let store = initStore(storeOptions);
  const useEntry = (appControl.source === 'cas') ? icasSetup : icomputeSetup;
  if (sessionID == undefined) {
    sessionID = null;
  }
  
  const _verify = (field, value) => {
    if (appControl[field] == null) {
      appControl[field] = value;
    }
  }
  // check
  _verify('byvars', []);
  _verify('customColumns', {});
  _verify('editControl', {handlers:{}, autoSave: true});
  _verify('initialFetch', {qs: {start: 0, limit: 10, format: false,where: ' '}});
  

  let appEnv = {
    source: appControl.source,
    table : appControl.table,
    byvars: appControl.byvar,
    userData: {},
    onNoData: appControl.onNoData != null ? appControl.onNoData : 'clear',
    user: user,
    fetchCount: 0,
    store,
    session  : null,
    servers  : null,
    sessionID: null,
    userSessionID: null,
    userFunctions: (userFunctions != null) ? userFunctions : {},
    casServerName: appControl.casServerName,
    computeContext: appControl.computeContext,
    logonPayload,
    appControl,

    activeWhere: (appControl.initialFetch.qs.where != null) ? appControl.initialFetch.qs.where : ' ',
    builtins: (builtins != null) ? builtins: {},
   
    state: {
      cache        : {rows:[], schema: []},   
      modified     : [],
      pagination   : {},
      point        : '',
      scrollOptions: [],
      data         : [],
      columns      : {},
      tableSummary : {}
    },

    id: Date()
  };

  if (logonPayload.host == null) {
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Please specify a Viya host';
  }
  appEnv = await useEntry(store, logonPayload, appControl, appEnv, sessionID);
  appEnv.sessionID = appEnv.session.items('id');
  appEnv.userSessionID = sessionID;
  // await getTableSummary(appEnv);
  return appEnv;
}

// cas server
async function icasSetup (store, logonPayload, appControl, appEnv, sessionID) {
  
  let r;
  try {
   
    r = await casSetup(store, logonPayload, sessionID, appEnv.casServerName);
    appEnv.session = r.session;
    appEnv.servers = r.servers;
    appEnv.casServerName = appEnv.session.links('execute','link','server');
  } catch (err) {
    
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Unable to create session. Please see console for messages';
  }
  appEnv.restaf = restaf;
  appEnv.restafedit = restafedit;
  appEnv.restaflib = restaflib;
  appEnv.serverName = appEnv.session.links('execute','link','server');
  
  if (appControl.editControl.handlers.initApp != null) {
    try {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
        // await termApp(appEnv, true);
        throw 'ERROR: initApp failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
       //  await termApp(appEnv, true);
      // eslint-disable-next-line no-throw-literal
      throw 'ERROR: Setup failed. Please see console for error messages';
    }
  }

  if (appControl.preamble != null) {
    try {
      const rx = await caslRun(store, r.session, appControl.preamble);
      if (rx.disposition.statusCode !== 0) {
        console.log(JSON.stringify(rx, null, 4));
        // eslint-disable-next-line no-throw-litera
       // await termApp(appEnv, true);
        throw 'ERROR: Preamble  code failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      throw 'Preamble failed in accessing cas. Please see console';
    }
  }

  return appEnv;
};

// Compute server
async function icomputeSetup (store, logonPayload, appControl, appEnv, sessionID) {
  // eslint-disable-next-line prefer-const
  let session;
  //Use sessionID to reuse an existing session
  session = await computeSetup(store, appControl.computeContext, logonPayload, null, sessionID);
  appEnv.session = session;
  appEnv.sessionID = session.items('id');
  if (sessionID != null) {
    appEnv.userSessionID = sessionID;
  }
  if (appControl.editControl.handlers.initApp != null) {
    try {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
       // await termApp(appEnv, true);
        throw 'ERROR: initApp failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      // await termApp(appEnv, true);
      throw 'ERROR: Setup failed. Please see console for error messages';
    }
  }

  let tableSummary = {};
  if (appControl.table != null){
    try {
      tableSummary = await computeSetupTables(store, session, appControl.table, appControl.preamble);
    } catch (err) {
      console.log(err);
      // await termApp(appEnv, true);
      throw err;
    }
  }
  appEnv.tableSummary = tableSummary;
  return appEnv;
}

export default setup;