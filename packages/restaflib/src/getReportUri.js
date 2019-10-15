/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
/**
 * Generate url for report(async)
 * @module getReportUrl
 * 
 * @param {object} store  - restaf store
 * @param {string} name - name of report
 * 
 * @returns {string} url for the report
 */
let findReport  = require('./findReport');
async function getReportUri (store, name) {
    let reportsList = await findReport(store, name);
    if (reportsList === null) {
        throw `${name} was not found`;
    }
    let uri = reportsList.itemsCmd(name, 'self', 'link', 'uri');
    return uri;
}
export default getReportUri;

