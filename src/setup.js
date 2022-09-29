/* eslint-disable prefer-const */

import { initStore } from '@sassoftware/restaf';
import { casSetup, computeSetup, computeSetupTables, caslRun } from '@sassoftware/restaflib';

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

    state: {
      modified   : [],
      pagination : {},
      currentPage: {},

      data   : {},
      columns: {}
    },

    id: Date()
  };

  try {
    if (logonPayload.host == null) {
      // eslint-disable-next-line no-throw-literal
      throw 'ERROR: Please specify a Viya host';
    }
    appEnv = await useEntry(store, logonPayload, appControl, appEnv);
    // do the equivalent of fseinit
    if (appControl.editControl.handlers.initApp != null) {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      appEnv.session = r.session;
      appEnv.servers = r.servers;
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
        throw 'ERROR: initApp failed. Please see console for messages';
      }
    }
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Setup failed. Please see console for error messages';
  }

  return appEnv;
}

// cas server
async function icasSetup (store, logonPayload, appControl, appEnv) {
  const preamble = (appControl.editControl.handlers.initApp != null) ? null : appControl.preamble;
  let r;

  try {
    r = await casSetup(store, logonPayload);
    appEnv.session = r.session;
    appEnv.servers = r.servers;
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: cassetup failed. Please see console for messages';
  }

  if (preamble != null) {
    try {
      const rx = await caslRun(store, r.session, preamble);
      if (rx.disposition.statusCode !== 0) {
        console.log(JSON.stringify(rx, null, 4));
        // eslint-disable-next-line no-throw-literal
        throw 'ERROR: Preamble failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      throw 'caslRun failed. Please see console';
    }
  };

  return appEnv;
};

// Compute server
async function icomputeSetup (store, logonPayload, appControl, appEnv) {
  // eslint-disable-next-line prefer-const
  const preamble = (appControl.editControl.handlers.initApp != null) ? null : appControl.preamble;

  let session = await computeSetup(store, appControl.computeContext, logonPayload);
  appEnv.session = session;

  // eslint-disable-next-line no-useless-catch

  let tableSummary;
  try {
    tableSummary = await computeSetupTables(store, session, appControl.table, preamble);
  } catch (err) {
    console.log(err);
    throw err;
  }

  appEnv.tableSummary = tableSummary;

  return appEnv;
}

export default setup;
