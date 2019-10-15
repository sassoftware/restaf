/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

async function getODS (store, computeSummary){
    debugger;
    let result = null;
    if (computeSummary.ods !== null) {
        result = await store.apiCall(computeSummary.ods);
    }
    return result;
}
export default getODS;
