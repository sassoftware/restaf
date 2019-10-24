/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

async function getLog (store, computeSummary){
    debugger;
    let log = '';
    let result;
    if (computeSummary.log !== null) {
       let result = await store.apiCall(computeSummary.log);
       log = log + result.items('data');
       do while (result.itemsCmd('next') !)
    return log;
}
export default getLog;
