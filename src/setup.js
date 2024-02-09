/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable prefer-const */

import { initStore } from "@sassoftware/restaf";
import {
  casSetup,
  computeSetup,
  computeRun,
  computeSetupTables,
  computeResults,
  caslRun,
} from "@sassoftware/restaflib";
import prepFormData from "./prepFormData";

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
 * @param {object=} builtins  builtins functions
 * @param {string=} user  user name
 * @param {object=} userFunctions  user functions
 *
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
async function setup(
  logonPayload,
  appControl,
  sessionID,
  builtins,
  user,
  userFunctions,
  storeConfig
) {
  const { source } = appControl;
  console.log("Incoming logonPayload.storeConfig", storeConfig);
  debugger;
  if (storeConfig == null) {
    storeConfig = {
      casProxy: true,
      options: { ns: null, proxyServer: null },
    };
  }
  // Note: that each setup creates its own store

  let store = initStore(storeConfig);
  if (logonPayload !== null) {
    let msg = await store.logon(logonPayload);
  }

  const useEntry =
    source === "cas"
      ? icasSetup
      : source === "compute"
      ? icomputeSetup
      : nosource;
  if (sessionID == undefined) {
    sessionID = null;
  }

  const _verify = (field, value) => {
    if (appControl[field] == null) {
      appControl[field] = value;
    }
  };
  // check
  _verify("table", null);
  _verify("byvars", []);
  _verify("customColumns", {});
  _verify("editControl", { handlers: {}, autoSave: true });
  _verify("initialFetch", {
    qs: { start: 0, limit: 10, format: false, where: " " },
  });

  let appEnv = {
    source: source,
    table: appControl.table,
    byvars: appControl.byvar,
    userData: {},
    onNoData: appControl.onNoData != null ? appControl.onNoData : "clear",
    user: user,
    fetchCount: 0,
    store,
    session: null,
    servers: null,
    sessionID: null,
    userSessionID: null,
    userFunctions: userFunctions != null ? userFunctions : {},
    casServerName: appControl.casServerName,
    computeContext: appControl.computeContext,
    logonPayload,
    appControl,

    activeWhere:
      appControl.initialFetch.qs.where != null
        ? appControl.initialFetch.qs.where
        : " ",
    builtins: builtins != null ? builtins : {},

    state: {
      cache: { rows: [], schema: [] },
      modified: [],
      pagination: {},
      scrollOptions: [],
      data: [],
      columns: {},
      tableSummary: {},
    },

    id: Date(),
  };

  if (logonPayload && logonPayload.host == null) {
    // eslint-disable-next-line no-throw-literal
    throw "ERROR: Please specify a Viya host";
  }
  appEnv = await useEntry(
    store,
    null /*logonPayload*/,
    appControl,
    appEnv,
    sessionID
  );
  let id1 = appEnv.session.items("id");
  let ssid = await store.apiCall(appEnv.session.links("self"));
  let id = ssid.items("id");
  appEnv.sessionID = id;
  appEnv.userSessionID = sessionID;
  return appEnv;
}

// _nosource
async function nosource(_store, _logonPayload, appControl, appEnv, _sessionID) {
  let r = await prepFormData(appEnv.state.cache, appEnv, true);
  // TBD: Need to handle preamble for this case.
  if (appControl.editControl.handlers.initApp != null) {
    try {
      await _initApp(appEnv);
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      // await termApp(appEnv, true);
      throw "ERROR: initApp failed. Please see console for messages";
    }
  }
  appEnv.state.data = r.data;
  appEnv.state.columns = r.columns;
  appEnv.state.cache = r.cache;
  return appEnv;
}

async function _initApp(appEnv) {
  try {
    const r = await appEnv.appControl.editControl.handlers.initApp(
      appEnv,
      "initApp"
    );
    if (r.statusCode === 2) {
      console.log(JSON.stringify(r, null, 4));
      // eslint-disable-next-line no-throw-literal
      // await termApp(appEnv, true);
      throw "ERROR: initApp failed. Please see console for messages";
    }
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    // await termApp(appEnv, true);
    throw "ERROR: Setup failed. Please see console for error messages";
  }
}
// cas server
async function icasSetup(store, logonPayload, appControl, appEnv, sessionID) {
  let r;
  try {
    debugger;
    r = await casSetup(store, logonPayload, sessionID, appEnv.casServerName);
    debugger;
    appEnv.session = r.session;
    appEnv.servers = r.servers;
    appEnv.casServerName = appEnv.session.links("execute", "link", "server");
  } catch (err) {
    // eslint-disable-next-line no-throw-literal
    throw "ERROR: Unable to create session. Please see console for messages";
  }

  appEnv.serverName = appEnv.session.links("execute", "link", "server");

  if (appControl.editControl.handlers.initApp != null) {
    await _initApp(appEnv);
  }

  if (appControl.preamble != null) {
    try {
      const rx = await caslRun(store, r.session, appControl.preamble, {}, true);
      if (rx.disposition.statusCode !== 0) {
        console.log(JSON.stringify(rx, null, 4));
        // eslint-disable-next-line no-throw-litera
        // await termApp(appEnv, true);
        throw "ERROR: Preamble  code failed. Please see console for messages";
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      throw "Preamble failed.Please see console";
    }
  }

  return appEnv;
}

// Compute server
async function icomputeSetup(
  store,
  logonPayload,
  appControl,
  appEnv,
  sessionID
) {
  // eslint-disable-next-line prefer-const
  let session;
  debugger;
  session = await computeSetup(
    store,
    appControl.computeContext,
    logonPayload,
    null,
    sessionID
  );
  debugger;
  appEnv.session = session;
  if (sessionID != null) {
    appEnv.userSessionID = sessionID;
  }

  try {
    if (appControl.editControl.handlers.initApp != null) {
      await _initApp(appEnv);
    }
  } catch (err) {
    console.log(err);
    throw "ERROR: initApp failed. Please see console for messages";
  }
  
  
  if ( appControl.preamble != null ) {
    console.log('running preamble', appControl.preamble);
    const result = await computeRun( store, session, appControl.preamble );
    console.log(result.SASJobStatus);
    if ( result.SASJobStatus === 'error' ) {
      let log = await computeResults(store, result, 'log');
      console.log(log);
      throw `Error: Preamble failed with completion code of ${result.SASJobStatus}`;
    }
      
  }
  let tableSummary = {};
  if (appControl.table != null) {
    try {
      tableSummary = await computeSetupTables(
        store,
        session,
        appControl.table,
        null,/*appControl.preamble -- do preamble here */
      );
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
