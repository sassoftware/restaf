/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description Run termapp handler and delete session
 * @async
 * @module termApp
 * @category restafedit/core
 * @param {appEnv} appEnv   appEnv
 * @returns {promise} returns status object
 * @alias module: termApp
 * @example
 *  let r  = await termSession(appEnv)
 *  This is a good option for some post processing at the end of edit session
 *  If the post processing is done on the Viya Server, recommend using restaf and restafedit to make
 *  the REST calls.
 *  Note: If sessionID was specified in the call to setup, the session will not be deleted.
 */

async function termApp (appEnv,setup) {
  const { store, session } = appEnv;
  const handlers = appEnv.appControl.editControl.handlers;
  if (handlers.termapp != null && setup == null) {
    await handlers.termapp(appEnv);
  }

  // If user supplied session do not delete session.

  if (appEnv.userSessionID == null) {
    await store.apiCall(session.links('delete'));
  };
  console.log('Application terminated successfully');
  return { msg: 'Session terminated', statusCode: 0 };
};
export default termApp;
