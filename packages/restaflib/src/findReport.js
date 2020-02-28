/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';
/**
 *  Search for a named report(async)
 * @async
 * @module findReport
 * 
 * @param {object} store - restaf store
 * @param {string} name - name of the VA report (null to get a list of all reports)
 * 
 * @returns {object} - either null or rafObject for the report
 * @alias module: findReport
 */

async function findReport (store, name) {
    let reports = store.getService('reports');
    let payload = null;
    if (name !== null) {
        payload = {
            qs: {
                filter: `eq(name,'${name}')`
            }
        };
    }
    // call the reports service
    debugger;
    let reportsList = await store.apiCall(reports.links('reports'), payload);
    // check to see if atleast one report was found(hopefully one only)
    return (reportsList.itemsList().size === 0) ? null : reportsList; 
}
export default findReport;

