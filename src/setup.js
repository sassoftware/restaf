/* eslint-disable prefer-const */

import { initStore } from '@sassoftware/restaf';
import { casSetup, computeSetup, computeSetupTables, caslRun } from '@sassoftware/restaflib';
import getTableSummary from './getTableSummary';
import termApp from './termApp';

/**
 * @description Setup an Edit session
 * @async
 * @module setup
 * @category restafedit/core
 * @param {logonPayload} logonPayload  -information for connecting to Viya
 * @param {appControl} appControl       control information
 * @param {string=} sessionID if specified, this session will be used.Must match source
 *
 * @returns {promise}  returns appEnv to control the flow
 * @alias module: setup
 * @example
 *  const appEnv = await setup(logonPayload, appControl);
 *  The setup method does the following:
 *    1. Create a session based on the source
 *    2. Optionally run the appInit handler (if specified)
 *    3. Optionally run the preamble code (if specified)
 *    4. Return the appEnv object.
 * 
 *    The appInit handler and the preamble code can be used to setup related information, create
 *    temporary tables etc...
 *
 */

async function setup (logonPayload, appControl, sessionID) {
  let storeOptions = (logonPayload.storeOptions != null) ? logonPayload.storeOptions : { casProxy: true };
  const store = initStore(storeOptions);
  const useEntry = (appControl.source === 'cas') ? icasSetup : icomputeSetup;
  let appEnv = {
    source: appControl.source,
    table : appControl.table,
    byvars: appControl.byvar,

    onNoData: appControl.onNoData != null ? appControl.onNoData : 'clear',

    fetchCount: 0,

    store,
    session  : null,
    servers  : null,
    restaflib: null,
    sessionID: null,

    userSessionID: null,

    logonPayload,
    appControl,

    activeWhere: (appControl.initialFetch.qs.where != null) ? appControl.initialFetch.qs.where : ' ',

    state: {
      modified     : [],
      pagination   : {},
      point        : '',
      scrollOptions: [],
      data         : {},
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
  await getTableSummary(appEnv);
  return appEnv;
}

// cas server
async function icasSetup (store, logonPayload, appControl, appEnv, sessionID) {
  let r;
  try {
    r = await casSetup(store, logonPayload, sessionID);
    appEnv.session = r.session;
    appEnv.servers = r.servers;
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-throw-literal
    throw 'ERROR: Unable to create session. Please see console for messages';
  }

  if (appControl.editControl.handlers.initApp != null) {
    try {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
        await termApp(appEnv, true);
        throw 'ERROR: initApp failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
      await termApp(appEnv, true);
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
        await termApp(appEnv, true);
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

  let session = await computeSetup(store, appControl.computeContext, logonPayload, sessionID);
  appEnv.session = session;

  if (appControl.editControl.handlers.initApp != null) {
    try {
      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');
      if (r.statusCode === 2) {
        console.log(JSON.stringify(r, null, 4));
        // eslint-disable-next-line no-throw-literal
        await termApp(appEnv, true);
        throw 'ERROR: initApp failed. Please see console for messages';
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-throw-literal
      await termApp(appEnv, true);
      throw 'ERROR: Setup failed. Please see console for error messages';
    }
  }

  // eslint-disable-next-line no-useless-catch

  let tableSummary;
  ;
  try {
    tableSummary = await computeSetupTables(store, session, appControl.table, appControl.preamble);
  } catch (err) {
    console.log(err);
    await termApp(appEnv, true);
    throw err;
  }

  appEnv.tableSummary = tableSummary;

  return appEnv;
}

export default setup;
