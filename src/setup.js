
import { initStore } from '@sassoftware/restaf';
import { casSetup } from '@sassoftware/restaflib';

/**
 * @description Setup an Edit session
 * @async
 * @module setup
 * @category restafedit/core
 * @param {logonPayload} logonPayload  - information for connecting to Viya
 * @param {appControl} appControl      - control information
 *
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
  if (logonPayload.authType == null) {
    logonPayload.authType = 'code';
  }

  const r = await casSetup(store, logonPayload);

  const appEnv = {
    store,
    session  : r.session,
    servers  : r.servers,
    restaflib: null,
    logonPayload,
    state    : {
      modified   : [],
      pagination : {},
      currentPage: {},
      data       : {},
      columns    : {}
    }
  };
  appEnv.appControl = appControl;
  appEnv.id = Date(); /* just assign a new id - placeholder */
  return appEnv;
}
export default setup;
