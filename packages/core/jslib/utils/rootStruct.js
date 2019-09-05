"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tLinkStruct = tLinkStruct;
exports.itemsStruct = itemsStruct;
exports.statusInfoStruct = statusInfoStruct;

require("core-js/modules/es6.string.link");

var _actionTypes = require("../actionTypes");

/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
function tLinkStruct(name, type, service) {
  if (service === _actionTypes.APP_DATA_ROOT || service === _actionTypes.API_STATUS_ROOT || service === _actionTypes.API_XSRF_ROOT) {
    return {
      structType: service,
      type: service,
      route: service,
      routeList: [],
      userData: {}
    };
  }

  var relPath = {
    structType: type,
    type: type,
    title: name,
    method: 'GET',

    /* for cmd tLinks - useful in UI */
    iconfig: {},

    /* input config */
    payload: {},
    statusInfo: statusInfoStruct(),
    runStatus: 'idle',
    parentRoute: '',
    route: '',
    resultType: '',
    links: {},

    /* same structures */

    /*  cmds      : {}, */
    scrollCmds: {},

    /* same structure */
    paginator: false,
    itemsList: [],
    items: [],

    /* items Struct */
    details: {},
    stateEvent: null,
    responseHeaders: {},
    link: null,
    raw: {}
  };

  if (arguments.length === 3) {
    relPath.link = {
      method: 'GET',
      title: service,
      href: '/' + service + '/',
      rel: 'root',
      type: 'application/vnd.sas.api',
      uri: '/' + service + '/'
    };
    relPath.route = "".concat(service, ":/").concat(service);
    relPath.parentRoute = service;
  }

  return relPath;
}
/* also for info */


function itemsStruct() {
  return {
    name: '',
    type: '',
    resultType: '',
    cmds: null,
    data: null
  };
}

function statusInfoStruct() {
  return {
    status: 0,
    statusText: ' ',
    error: false,
    details: ' '
  };
}