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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SASLogonOauthLink = void 0;

var _serverCalls = require("../serverCalls");

var _actionTypes = require("../actionTypes");

var SASLogonOauthLink = function SASLogonOauthLink(type) {
  if (type === _actionTypes.VIYA_LOGON_PASSWORD || type == undefined) {
    return {
      logon: _serverCalls.trustedGrant,
      link: {
        href: '/SASLogon/oauth/token',
        method: 'POST',
        rel: 'logon',
        responseType: 'application/json',
        type: 'application/x-www-form-urlencoded',
        uri: '/SASLogon/oauth/token'
      }
    };
  } else {
    return {
      logon: _serverCalls.implicitGrant,
      link: {
        href: '/SASLogon/oauth/authorize',
        method: 'GET',
        rel: 'logon',
        responseType: type,
        uri: '/SASLogon/oauth/authorize'
      }
    };
  }
};
/*
 * redirectUri not specified - /SASLogon/oauth/token?
 */


exports.SASLogonOauthLink = SASLogonOauthLink;