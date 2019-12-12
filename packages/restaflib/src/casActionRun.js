/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
/** 
 * lib
 */
/**
 *
 * Calls cas server and returns the results(async)
 * 
 * @async
 * @module caslBase
 * 
 * @param {object} store       - restaf store
 * @param {object} session     - cas session
 * @param {object} parameters  - parameters for the action
 * 
 * @returns {object}  returns results from cas
 */
'use strict';

//
// Notes: Function to call cas 
// See README file for notes on REUSECASSESSION
//
async function casActionRun (store, session, parameters) {
    let result  = await store.runAction(session, parameters);
    return result.items().toJS();
}
export default casActionRun;