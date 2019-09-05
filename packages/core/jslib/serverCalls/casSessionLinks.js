"use strict";

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function casSessionLinks(uri, urihttp, casHttp, server) {
  return [{
    method: 'POST',
    href: "".concat(uri, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'casproxy',
    uri: "".concat(uri, "/actions"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'Run CAS Action',
    customHandling: 'casExecute',
    casHttp: casHttp,
    server: server,
    extended: true
  }, {
    method: 'POST',
    href: "".concat(urihttp, "/actions"),

    /* payload: data:...., qs: {action: ...} */
    rel: 'execute',
    uri: "".concat(urihttp, "/actions"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'Run CAS Action',
    customHandling: 'casExecute',
    casHttp: casHttp,
    server: server,
    extended: true
  }, {
    method: 'GET',
    href: "".concat(uri, "/isIdle"),

    /* need to convert true/false to busy and completed */
    rel: 'state',
    uri: "".concat(uri, "/isIdle"),
    responseType: 'application/json',
    type: 'application/json',
    itemType: 'application/json',
    title: 'state',
    customHandling: 'casState',
    casHttp: casHttp,
    server: server,
    extended: true
  }];
};