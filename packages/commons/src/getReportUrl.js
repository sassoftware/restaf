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
async function getReportUrl (store, name) {
    let reportsList = await findReport(store, name);
    if (reportsList === null) {
        return `${name} was not found`;
    }
    let uri = reportsList.itemsCmd(name, 'self', 'link', 'uri');
    let options = "&appSwitcherDisabled=true&reportViewOnly=true&printEnabled=true&sharedEnabled=true&informationEnabled=true&commentEnabled=true&reportViewOnly=true";
    let url = `${process.env.VIYA_SERVER}/SASReportViewer/?reportUri=${uri}${options}`;
    return url;
}
export default getReportUrl;

