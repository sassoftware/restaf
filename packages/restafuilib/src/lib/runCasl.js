/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import {caslRun} from 'restaflib';
import programs from '../programs';

/* read programs */
async function runCasl (store, session, casl, args) {
    let src = '';
    casl.forEach(s => {
        src = src + ' ' + programs[s]();
    });
    debugger;
    let result = await caslRun(store, session, src, args);
    return result.results.casResults;
}

export default runCasl;