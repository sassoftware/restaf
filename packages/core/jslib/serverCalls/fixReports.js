"use strict";

/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
module.exports = function fixReports(response) {
  var items = response.data.results.items;

  for (var i = 0; i < items.length; i++) {
    var reportUri = "/SASReportViewer/?reportUri=/reports/reports/".concat(items[i].id);
    var l = {
      method: "GET",
      href: reportUri,
      rel: "viewer",
      uri: reportUri,
      type: "text/html",
      itemType: "text/html",
      title: "Report Viewer",
      extended: true
    };
    items[i].links.push(l);
  }
};