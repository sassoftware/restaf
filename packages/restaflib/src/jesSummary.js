/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/



/**
 * @description Reduce the job information into consummable form(async)
 * 
 * @async
 * @module jesSummary
 * @category restaflib/jes
 * @private
 * @param {object} store - restaf store
 * @param {object} job - rafObject representing the compute service job
 * 
 * @returns {object} - the computeSummary object for easy handling of logs,listing,ods, tables
 */
async function jesSummary(store, job) {
    return await jobResults(store, job);
}
async function jobResults(store, job) {
    let jobjs = job.items().toJS();
    let cResult = {
        session: job.session,
        log: null,
        listing: null,
        ods: null,
        job: job /*null*/,
        tables: {},
        files: {},
        results: jobjs.results
    };

    // extract fileid in the files service.
 
    debugger;
    for (let p in jobjs.results) {
        if (!(p === 'COMPUTE_CONTEXT' || p === 'COMPUTE_JOB' || p === 'COMPUTE_SESSION')) {
            debugger;
            let pa = p.split('.');
            pa.shift(); 
            let key = pa.join('.');
            /*
            let key = pa[1];;
            if (pa.length === 3) {
                key = pa[1] + '.' + pa[2];
            }
                */
            

            let l = jobjs.results[p];
            let la = l.split('/');
            let id = la[la.length - 1];
            cResult.files[key] = await getContent(store, id);
        }
    }
    
    cResult.log = cResult.files['log.txt'];
    cResult.listing = cResult.files['listing.txt'];
    // get the log and listing for ease of use
    /*
    cResult.log = await getContent(store, cResult.files['log.txt']);
    cResult.listing = await getContent(store, cResult.files['listing.txt']);
    */

    async function getContent(store, id) {
        let { files } = await store.addServices("files");
        let payload = {
            qs: {
                filter: `eq(id,'${id}')`
            }
        }
        
        let f = await store.apiCall(files.links("files"), payload);
        let contentRaf = f.itemsCmd(f.itemsList(0), 'content');
        let text = await store.apiCall(contentRaf);
        return text.items();
    }
    return cResult;
}
export default jesSummary;

