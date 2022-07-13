/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
/** 
 * lib
 */
/**
 *
 * @description Score data in casl
 * 
 * @async
 * @module caslScore
 * 
 * @param {store} store    - restaf store
 * @param {rafObject} session  - cas session
 * @param {object} scenario   - scenario values
 * 
 * @returns {promise}  returns the scores as an object
 */
'use strict';

import caslRunBase from './caslRunBase';
import programs from './programs';

async function caslDescribe (store, session, scenario) {
    
    let src    = programs['commonCasl']() + ' ' + programs['scoreCasl']();
    let appEnv = {path: '/describe', ...scenario};
    let result = await caslRunBase(store, session, src, appEnv);
    let finalResult = result.items('results').toJS();
    return finalResult;
}
export default caslDescribe;