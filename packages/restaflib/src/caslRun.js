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
 * @param {object} store    - restaf store
 * @param {object} session  - cas session
 * @param {object} src      - casl src statements
 * @param {object} args     - user input args
 * @param {object} env      - app specific vales
 * 
 * @returns {object}  standard return value from apiCall
 */
'use strict';

import jsonToDict from './jsonToDict';
//
// Notes: Function to call cas 
// See README file for notes on REUSECASSESSION
//
async function caslRun (store, session, src, args, env) {
    //
    // create casl statements for arguments and appenv
    //
    debugger;
    let _args_   = jsonToDict((args !== null) ? args : {}, '_args_') 
    let _appEnv_ = jsonToDict((env  !== null) ? env  : {}, '_appEnv_');

    let code = _args_ + ' ' + _appEnv_ + ' ' + src;
    
    // Patch for issues with sccasl.runcasl via REST API

    code = code.replace(/\r?\n|\r/g, '');
    // setup payload for runAction
    let payload = {
        action: 'sccasl.runcasl',
        data  : {code: code}
    }

    let result  = await store.runAction(session, payload);
    debugger;
    return result;
}
export default caslRun;