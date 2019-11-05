/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import restaflib from 'restaflib';
import programs from '../programs';

/* read programs */
async function runCasl (store, session, casl, args, inParms) {
    let src = '';
    casl.forEach(s => {
        src = src + ' ' + programs[s];
    });
    debugger;
    let result = restaflib.caslBase (store, session, src, args, inParms);
    return result;
}

export default runCasl;