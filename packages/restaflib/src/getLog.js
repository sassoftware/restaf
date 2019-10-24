/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

async function getLog (store, computeSummary){
    debugger;
    let log = [];
   
    if (computeSummary.log !== null) {
       let result = await store.apiCall(computeSummary.log);
       log = log.concat(result.items().toJS());
       let next;
       while ((next = result.scrollCmds("next")) !== null) {
        result = await store.apiCall(next);
        log = log.concat(result.items().toJS());
       }
    }
    return log;
}
export default getLog;
