/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

async function getListing (store, computeSummary){
    debugger;
    let result = ' ';
    if (computeSummary.listing !== null) {
        let r = await store.apiCall(computeSummary.listing);
    }
    return result;
}
export default getListing;
