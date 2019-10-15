/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
/** 
 * lib
 */
/**
 *
 * Score data in casl
 * 
 * @async
 * @module caslScore
 * 
 * @param {object} store    - restaf store
 * @param {object} session  - cas session
 * @param {object} scenario   - scenario values
 * 
 * @returns {object}  standard return value from apiCall
 */
'use strict';

import caslRun from './caslRun';
import programs from './programs';

async function caslScore (store, session, scenario) {
    debugger;
    let src    = programs['scoreCasl']();
    let appEnv = {path: '/score', ...scenario};
    let result = await caslRun(store, session, src, null, appEnv);
    return result.items('results', 'casResults').toJS();
}
export default caslScore;