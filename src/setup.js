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
 * @param {string=} preamble  casl or datastep code to execute
 * @returns {promise}  returns appEnv to control the flow
 * @alias module: setup
 * @example
 *  const appEnv = await setup(logonPayload, appControl);
 *
 * Please see the restafeditExample in the Tutorial pulldown
 *
 */

async function setup (logonPayload, appControl, preamble) {
  const store = initStore();
  let appEnv;
  if (logonPayload.authType == null) {
    logonPayload.authType = 'code';
  }
  if (appControl.source === 'cas') {
    appEnv = await icasSetup(store, logonPayload, appControl, preamble);
  } else {
    appEnv = await icomputeSetup(store, logonPayload, appControl, preamble);
  }
  return appEnv;
}

async function icasSetup (store, logonPayload, appControl, preamble) {
  console.log(store);
  console.log(logonPayload);
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
  if (preamble != null) {
    const rx = await caslRun(store, r.session, preamble);
    if (rx.details.statusCode !== 0) {
      console.log(rx);
      // eslint-disable-next-line no-throw-literal
      throw 'Preamble failed. Please see console';
    };
  }
  return appEnv;
};

async function icomputeSetup (store, logonPayload, appControl, preamble) {
  // eslint-disable-next-line prefer-const
  ;
  let session = await computeSetup(store, appControl.computeContext, logonPayload);
  let tableSummary = await computeSetupTables(store, session, appControl.table, preamble);
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
