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
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _actionTypes = require("../actionTypes");

var _queryString = _interopRequireDefault(require("query-string"));

var logon = function logon(store, ipayload) {
  return new Promise(function (resolve, reject) {
    var unSubscribe;
    var action;
    var implicitLogon = false;
    var payload = ipayload == null ? null : (0, _objectSpread2.default)({}, ipayload);

    if (store.getState().connections.get('currentConnection') >= 0) {
      resolve('ready');
    } else {
      var logonExit = function logonExit() {
        var newState = store.getState().connections;
        var runStatus = newState.get('runStatus');

        if (runStatus === 'ready') {
          unSubscribe();
          resolve(runStatus);
        } else if (runStatus === 'error') {
          unSubscribe();
          reject(newState.get('statusInfo').toJS());
        }
      };

      if (payload == null) {
        // Assume proxy condition
        payload = {
          host: "".concat(window.location.protocol, "//").concat(window.location.host),
          authType: _actionTypes.VIYA_LOGON_SERVER
        }; // Now check and see if we are in the callback for implicit flow

        if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
          var windowLocation = window.location;

          var host = _queryString.default.parse(windowLocation.search);

          var loc = _queryString.default.parse(windowLocation.hash);
          /* */
          //


          if (host !== null && host.host !== null) {
            payload.host = host.host; //noinspection JSUnresolvedVariable

            payload.tokenType = host.token_type != null ? host.token_type : null; //noinspection JSUnresolvedVariable

            payload.token = host.access_token != null ? host.access_token : null;

            if (payload.token !== null) {
              payload.authType = _actionTypes.VIYA_LOGON_IMPLICIT;
            }
          } //
          //noinspection JSUnresolvedVariable


          if (loc.access_token != null) {
            payload = {
              host: host.host,
              token: loc['access_token'],
              tokenType: loc['token_type'],
              authType: _actionTypes.VIYA_LOGON_IMPLICIT
            };
          }
        }
      } // now make the final decision


      switch (payload.authType) {
        case _actionTypes.VIYA_LOGON_SERVER:
          if (payload.host == null) {
            payload.host = "".concat(window.location.protocol, "//").concat(window.location.host);
          }

          break;

        case _actionTypes.VIYA_LOGON_IMPLICIT:
          if (!payload.hasOwnProperty('token')) {
            implicitLogon = true;
            getToken(payload);
            resolve('Implicit Call');
          }

          break;

        case "LOGOFF":
          break;

        default:
          break;
      }

      if (!implicitLogon) {
        action = {
          type: payload.authType === 'LOGOFF' ? 'LOGOFF' : _actionTypes.VIYA_LOGON,
          payload: (0, _objectSpread2.default)({}, payload)
        };
        unSubscribe = store.subscribe(logonExit);
        store.dispatch(action);
      }
    }
  });
};

function getToken(payload) {
  var x = "".concat(payload.host, "/SASLogon/oauth/authorize?response_type=token&client_id=").concat(payload.clientID); //noinspection JSUnresolvedVariable

  if (payload.redirect != null) {
    //noinspection JSUnresolvedVariable
    var redirectUri = "".concat(window.location.protocol, "//").concat(window.location.host, "/").concat(payload.redirect, "?host=").concat(payload.host);
    x = "".concat(x, "&redirect_uri=").concat(redirectUri);
  }

  window.location.replace(x);
}

var _default = logon;
exports.default = _default;