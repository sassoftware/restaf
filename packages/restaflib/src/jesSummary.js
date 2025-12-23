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
 * @returns {promise} - the computeSummary object for easy handling of logs,listing,ods, tables
 */

async function jesSummary(store, job) {
    return await jobResults(store, job);
}
async function jobResults(store, job) {
    let items = job.items().toJS();
    let cResult = {
        computeContext: items.results['COMPUTE_CONTEXT'],
        computeJob: items.results['COMPUTE_JOB'],
        computeSession: items.results['COMPUTE_SESSION'],
        session: job.session,
        log: null,
        listing: null,
        ods: null,
        job: job /*null*/,
        tables: {},
        files: {},
        results: items.results
    };

    // extract fileid in the files service.

    for (let p in items.results) {
        if (!(p === 'COMPUTE_CONTEXT' || p === 'COMPUTE_JOB' || p === 'COMPUTE_SESSION')) {
            let table = false;
            let key = null;
           
            if (p.endsWith('.json')) {
                key = p;
                table = true;
            } else {
                let pa = p.split('.');
                pa.shift();
                key = pa.join('.');
            }
            let l = items.results[p];
            if (l === null) continue;
            let la = l.split('/');
            let id = la[la.length - 1];

            let r = await getContent(store, key, id, table);
            if (table) {
                let name = key.split('.json')[0];
                cResult.tables[name] = r;
            } else {
                cResult.files[key] = r
            }
        }
    }
    // now format log and listing
    /*
    cResult.log = formatLog(cResult.files['log']);
    cResult.listing = formatLog(cResult.files['listing']);
    */

    return cResult;

    function formatLog(log) {
        if (log == null || Array.isArray(log) === false) return ' ';
        let logText = '';
        // eslint-disable-next-line array-callback-return
        log.map((data) => {
            let line = data.line.replace(/(\r\n|\n|\r)/gm, "");
            if (line.length === 0) {
                logText = logText + '\n';
            } else {
                logText = logText + line + '\n';
            }
        });
        return logText;
    };
    async function getContent(store, key, id, table) {
        let { files } = await store.addServices("files");
        let payload = {
            qs: {
                filter: `eq(id,'${id}')`
            }
        }
        try {
            let f = await store.apiCall(files.links("files"), payload);
            let contentRaf = f.itemsCmd(f.itemsList(0), 'content');
            let text = await store.apiCall(contentRaf);

            let items = text.items();
            if (typeof items === 'string') {
                return items;
            } else {
                let r = items.toJS();
                if (table) {
                   /* not clear why sas is returning an object sometimes */
                    if (Array.isArray(r)) {
                        return r;
                    }
                    let t = [];
                    Object.values(r).forEach(value => {
                        t.push(value);
                    });
                    return t;
                } else {
                    return r;   
                }
            }
        }
        catch (error) {
            return null;
        }

    }
}
export default jesSummary;


