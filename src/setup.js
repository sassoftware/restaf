/* eslint-disable prefer-const */

import { initStore } from '@sassoftware/restaf';
import { casSetup, computeSetup, computeSetupTables, caslRun } from '@sassoftware/restaflib';
// import deepcopy from 'deepcopy';

/**
 * @description Setup an Edit session
 * @async
 * @module setup
 * @category restafedit/core
 * @param {logonPayload} logonPayload  -information for connecting to Viya
 * @param {appControl} appControl       control information
 * @returns {promise}  returns appEnv to control the flow
 * @alias module: setup
 * @example
 *  const appEnv = await setup(logonPayload, appControl);
 *
 * Please see the restafeditExample in the Tutorial pulldown
 *
 */

async function setup (logonPayload, appControl) {
  let storeOptions = (logonPayload.storeOptions != null) ? logonPayload.storeOptions : { casProxy: true };
  const store = initStore(storeOptions);
  const useEntry = (appControl.source === 'cas') ? icasSetup : icomputeSetup;
  let appEnv = {
    source: appControl.source,
    table : appControl.table,
    byvars: appControl.byvar,

    store,
    session  : null,
    servers  : null,
    restaflib: null,

    logonPayload,
    appControl,
    logs: [],

    state: {
      modified   : [],
      pagination : {},
      currentPage: {},

      data   : {},
      columns: {}
    },

    id: Date()
  };
  if (logonPayload.authType == null || logonPayload.authType === 'code') {
    logonPayload.authType = 'server';
  }
  try {
    appEnv = await useEntry(store, logonPayload, appControl, appEnv);
    if (appControl.editControl.handlers.initApp != null) {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
      appEnv.logs.push(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
        throw 'initApp failed. Please see console';
      }
    }
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    throw 'Setup failed. Please see console for error message';
  }

  return appEnv;
}

async function icasSetup (store, logonPayload, appControl, appEnv) {
  const preamble = (appControl.editControl.handlers.initApp != null) ? null : appControl.preamble;
  let r;

  try {
    r = await casSetup(store, logonPayload);
  } catch (err) {
    appEnv.logs.push(err);
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    throw 'cassetup failed';
  }
  appEnv.session = r.session;
  appEnv.servers = r.servers;

  if (preamble != null) {
    console.log('casSetup', preamble);
    try {
      const rx = await caslRun(store, r.session, preamble);
      if (rx.disposition.statusCode !== 0) {
        console.log(JSON.stringify(rx, null, 4));
        appEnv.logs.push(JSON.stringify(rx, null, 4));
        // eslint-disable-next-line no-throw-literal
        throw 'Preamble failed. Please see console';
      }
    } catch (err) {
      console.log(err);
      appEnv.logs.push(JSON.stringify(err, null, 4));
      // eslint-disable-next-line no-throw-literal
      throw 'caslRun failed. Please see console';
    }
  };

  return appEnv;
};

async function icomputeSetup (store, logonPayload, appControl) {
  // eslint-disable-next-line prefer-const
  const preamble = (appControl.editControl.handlers.initApp != null) ? null : appControl.preamble;

  let session = await computeSetup(store, appControl.computeContext, logonPayload);

  let appEnv = {
    source: appControl.source,

    store,
    session,
    servers  : null,
    restaflib: null,

    logonPayload,
    appControl,

    state: {
      modified   : [],
      pagination : {},
      currentPage: {},

      data   : {},
      columns: {}
    },

    id: Date()
  };

  if (appControl.editControl.handlers.initApp != null) {
    const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
    if (r.statusCode === 2) {
      console.log(JSON.stringify(r, null, 4));
      // eslint-disable-next-line no-throw-literal
      throw 'initApp failed. Please see console';
    }
  }

  const tableSummary = await computeSetupTables(store, session, appControl.table, preamble);
  appEnv.tableSummary = tableSummary;

  return appEnv;
}

export default setup;
