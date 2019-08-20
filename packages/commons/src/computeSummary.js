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
  * @returns {object} - the computeSmmary object
  */
async function computeSummary (store, job){
    let cResult = {
        log    : null,
        listing: null,
        ods    : null,
        tables : {}
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
                    cResult.ods = results.itemsCmd(resultItem, 'self');
                } else if (type === 'table') {
                    cResult.tables[resultItem] = results.itemsCmd(resultItem, 'self');
                } else {
                  console.log (`what is ${type} ?`)
                }
            }
        }
    }
    debugger;
    return cResult;

}
export default computeSummary;

