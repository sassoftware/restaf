/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

async function getLog (store, computeSummary){
    debugger;
    let result = null;
    if (computeSummary.log !== null) {
        result = await store.apiCall(computeSummary.log);
    }
    return result;
}
export default getLog;
