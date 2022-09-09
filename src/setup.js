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
  const store = initStore();
  let appEnv;
  if (logonPayload.authType == null) {
    logonPayload.authType = 'code';
  }
  if (appControl.source === 'cas') {
    appEnv = await icasSetup(store, logonPayload, appControl);
  } else {
    appEnv = await icomputeSetup(store, logonPayload, appControl);
  }
  return appEnv;
}

async function icasSetup (store, logonPayload, appControl) {
  const r = await casSetup(store, logonPayload);
  let appEnv = {
    source: appControl.source,

    store,
    session  : r.session,
    servers  : r.servers,
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
  if (appControl.preamble != null) {
    const rx = await caslRun(store, r.session, appControl.preamble);
    if (rx.disposition.statusCode !== 0) {
      console.log(JSON.stringify(rx, null, 4));
      // eslint-disable-next-line no-throw-literal
      throw 'Preamble failed. Please see console';
    };
  }
  return appEnv;
};

async function icomputeSetup (store, logonPayload, appControl) {
  // eslint-disable-next-line prefer-const
  ;
  let session = await computeSetup(store, appControl.computeContext, logonPayload);
  let tableSummary = await computeSetupTables(store, session, appControl.table, appControl.preamble);
  let appEnv = {
    source: appControl.source,

    store,
    session,
    tableSummary,

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
  return appEnv;
}

export default setup;
