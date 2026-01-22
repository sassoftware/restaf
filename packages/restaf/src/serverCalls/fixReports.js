/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
  ;
function fixReports ( response ) {
    let items = response.data.results.items;
    for ( let i = 0; i < items.length; i++ ) {
      let reportUri = `/SASReportViewer/?reportUri=/reports/reports/${
        items[i].id
      }`;
      let l = {
        method  : "GET",
        href    : reportUri,
        rel     : "viewer",
        uri     : reportUri,
        type    : "text/html",
        itemType: "text/html",
        title   : "Report Viewer",
        extended: true
      };

      items[i].links.push( l );
    }
};
export default fixReports;