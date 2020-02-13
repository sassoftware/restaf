/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/ 
 
 /**
  *  Reduce the job information into consummable form(async)
  * 
  * @async
  * @module computeSummary
  * 
  * @param {object} store - restaf store
  * @param {object} job - rafObject representing the compute service job
  * 
  * @returns {promise} - the computeSummary object for easy handling of logs,listing,ods, tables
  * @alias module: computeSummary
  */
async function computeSummary (store, session, job){
    let cResult = {
        session: session,
        log    : null,
        listing: null,
        ods    : null,
        job    : job,
        tables : {},
        files  : {}
    };
    cResult.log     = job.links('log');
    cResult.listing = job.links('listing');
    let reportLink  = job.links('results');
    if (reportLink !== null) {
        let results = await store.apiCall(reportLink);
        let size = results.itemsList().size; /* How many results: ods, table1, table2, ... */
        if (size > 0) {
            for (let i = 0 ; i < size; i++) {
                let resultItem = results.itemsList(i);
                let type = results.items(resultItem, 'data', 'type').toLowerCase();
                if (type === 'ods') {
                    cResult['ods'] = results.itemsCmd(resultItem, 'self');
                } else if (type === 'table') {
                    let r= {
                        self   : results.itemsCmd(resultItem, 'self'),
                        current: null
                    };
                    cResult.tables[resultItem] = r;
                } else if(type === 'file'){
                    let r= {
                        self   : resultItem,
                        current: null,
                        data   : null
                    };
                    cResult.files[resultItem] = r;
                } else {
                    let r = {
                        self   : resultItem,
                        current: null,
                        data   : null
                    };
                    cResult[type] = r;
                    console.log(`New type: ${type}`);
                }
            }
        }
    }
    debugger;
    return cResult;

}
export default computeSummary;

