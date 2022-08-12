/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
import { isArray } from "lodash";

 
 
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
  * let restaf    = require("@sassoftware/restaf");
let restaflib = require("@sassoftware/restaflib");
let payload = require('./config')();

let store = restaf.initStore();

async function example (store, logonPayload) {
  let { computeSetup, computeRun } = restaflib;
  let msg = await store.logon(logonPayload);
  let computeContext = null; 

  let computeSession = await computeSetup(store, computeContext);
  
  let macros = {data: 'sashelp.cars'};
  let code = `ods html style=barrettsblue;  
    data dtemp1;
    set sashelp.cars;
    run;
    data dtemp2;
    do i = 1 to 1000000;
        output;
    end;
    run;
    proc print data=&data;run;
    ods html close;`
  ;
  let computeSummary = await computeRun(
      store,
      computeSession,
      code,
      macros
  );
  let log = await restaflib.computeResults(store, computeSummary, 'log');
  let ods = await restaflib.computeResults(store, computeSummary, 'ods');
  viewer(log);
  console.log(ods);
  await store.apiCall(computeSession.links('delete'));
  return "All Done";
  }
function viewer (dataL) {
  dataL.map(data => {
    let line = data["line"].replace(/(\r\n|\n|\r)/gm, "");
    if (line.length === 0) {
      line = "  ";
    }
    console.log(line);
  });
}
  */
async function computeSummary (store, session, job, tables){
    let cResult = {
        session: session,
        log    : null,
        listing: null,
        ods    : null,
        job    : job,
        tables : {},
        files  : {}
    };
    

const jobResults = async  () => {
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
                }
            }
        }
    }

return true;
}
const addTable = async (itable) => {
    debugger;
    let {libref, name} = itable;
    let p = {
        qs: { filter: `eq(name,'${libref}')`}
    };
    let currentLibrefs = await store.apiCall(session.links('librefs'), p);
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
    cResult.tables[tname] = r;

}

if (job !== null) {
    await jobResults();
} 
if (tables != null) {
    let t = (Array.isArray(tables) === true) ? tables : [tables];
    for (let i = 0; i <t.length; i++ ) {
        await addTable(t[i]);
    }
}
return cResult;

}
export default computeSummary;

