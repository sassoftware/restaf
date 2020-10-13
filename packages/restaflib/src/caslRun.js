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
 * @function caslRun
 * 
 * @param {object} store    - restaf store
 * @param {object} session  - cas session
 * @param {object} src      - casl src statements
 * @param {object} args     - user input args (reference this as _args_ in casl program)

 * 
 * @returns {promise}  returns results from cas
 */
'use strict';

import caslRunBase from './caslRunBase';
//
// Notes: Function to call cas 
// See README file for notes on REUSECASSESSION
//
async function caslRun (store, session, src, args) {
    let result  = await caslRunBase(store,session, src, args);
    
    return result.items().toJS();
}
export default caslRun;