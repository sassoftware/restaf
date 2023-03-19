/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * @description Generate url for report(async)
 * @module getReportUri
 * @category restaflib/report
 * 
 * @param {object} store  - restaf store
 * @param {string} name - name of report
 * 
 * @returns {promise} array of report's of the form {name: name, uri: uri} for the report(s)
 */
import findReport from './findReport';
async function getReportUri (store, name) {
    let reportsList = await findReport(store, name);
    if (reportsList === null) {
        let e = (name == null) ? 'No reports were found' : `${name} was not found`;
        throw e;
    }
    let result = [];
    reportsList.items().map((i,n) => {
        let uri = {
            name: n,
            uri : reportsList.itemsCmd(n, 'self', 'link', 'uri')
        };
        result.push(uri);
    });
    return result;
}
export default getReportUri;

