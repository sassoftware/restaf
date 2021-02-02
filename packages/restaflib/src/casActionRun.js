/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 *
 * @description Calls cas server and returns the results(async)
 * 
 * @async
 * @module casActionRun
 * 
 * @param {object} store       - restaf store
 * @param {object} session     - cas session
 * @param {object} parameters  - parameters for the action
 * 
 * @returns {promise}  returns results from cas 
 * @alias module: casActionRun
 * @example
 *  async function test_casAction () {
 *  let {session} = await restaflib.casSetup(store);
 *  // run fetch action
 *  let p  = 
 *    { action: 'table.fetch',
 *      data  : { table: { caslib: 'public', name: 'cars' } }
 *    };
 *  let casResults = await restaflib.casActionRun(store, session, p);
 *  print.object(casResults.tables.Fetch, 'Fetched Table');
 *  await store.apiCall(session.links('delete'));
 *  }
 */
'use strict';


// Notes: Function to call cas 
// See README file for notes on REUSECASSESSION
//
async function casActionRun (store,...rest) {
    let result  = await store.runAction(...rest);
    return result.items().toJS();
}
export default casActionRun;