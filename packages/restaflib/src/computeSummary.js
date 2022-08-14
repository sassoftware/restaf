/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
import { isArray, result } from "lodash";

 
 
 /**
  * @description Reduce the job information into consummable form(async)
  * 
  * @async
  * @module computeSummary
  * @category restaflib/compute
  * 
  * @param {store} store - restaf store
  * @param {rafObject} job - rafObject representing the compute service job after job completion
  * 
  * @returns {promise} - the computeSummary object for easy handling of logs,listing,ods, tables
  * @example
  * 
  */
async function computeSummary (store, session, job, tables){
    
    let result;
    debugger;
    if (job != null && tables == null) {
        result = await jobResults(store, session, job );
    }  else {
        result = await isetupTable(store, session, tables)
    }
    return result;''
}

async function jobResults (store, session, job) {
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
        let size = results.itemsList().size; 
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
                    cResult.tables[resultItem.toLowerCase()] = r;
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
                }
            }
        }
    }

return cResult;
}

async function isetupTable(store, session, itable) {
    let cResult = {
        session: session,
        log    : null,
        listing: null,
        ods    : null,
        job    : null,
        tables : {},
        files  : {}
    };
    debugger;
    let {libref, name} = itable;
    let p = {
        qs: { filter: `eq(name,'${libref}')`}
    };
    debugger;
    let currentLibrefs = await store.apiCall(session.links('librefs'), p);
    debugger;
    if (currentLibrefs.itemsList().size === 0) {
        throw `Libref ${libref} not found`;
    }
    // get the links for this libref
    let rlink = currentLibrefs.itemsCmd(libref, 'self');
    let currentLibrefSelf = await store.apiCall(rlink);
    
    // get the table
    p = {
    qs: { filter: `eq(name,'${name}')`}
    };
    let tables = await store.apiCall(currentLibrefSelf.links('tables'));

    if (tables.itemsList().size === 0) {
        throw `Table ${name} not found`;
    }
    let tname = `${libref}.${name}`.toLowerCase();
    let r= {
        self   : tables.itemsCmd(name, 'self'),
        current: null
    };
    cResult.tables[tname.toLowerCase()] = r;
    return cResult;
}

export default computeSummary;

