"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _actionTypes = require("../actionTypes");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

/* import uuid from 'uuid' ;*/
var Immutable = require('immutable');

var Map = Immutable.Map,
    fromJS = Immutable.fromJS;
var initialState = fromJS({
  connections: [],
  user: 'none',
  type: 'server',
  currentConnection: -1,
  statusInfo: (0, _utils.statusInfoStruct)(),
  runStatus: 'idle'
});

function viyaLogon() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.BEGIN_LOGON:
      {
        return state.set('runStatus', 'busy');
      }

    case _actionTypes.VIYA_LOGON_SERVER:
      {
        var config = action.payload.iconfig;
        var newOne = {
          type: 'server',
          id: 1,
          user: 'You',
          desc: 'Server',
          logonInfo: {
            type: 'server',
            host: config.host,
            tokenType: config.hasOwnProperty('tokenType') === true ? config.tokenType : null,
            token: config.hasOwnProperty('token') === true ? config.token : null,
            pem: config.hasOwnProperty('pem') ? config.pem : null,
            rejectUnauthorized: config.hasOwnProperty('rejectUnauthorized') ? config.rejectUnauthorized : null,
            withCredentials: config.hasOwnProperty('withCredentials') ? config.withCredentials : true,
            keepAlive: config.hasOwnProperty('keepAlive') ? config.keepAlive : null
          }
        };
        var temp = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: {},
          user: 'You of course!',
          connections: [newOne]
        };
        return fromJS(temp);
      }

    case _actionTypes.VIYA_LOGON_IMPLICIT:
      {
        var _config = action.payload.iconfig;

        if (action.error === true) {
          return state.withMutations(function (s) {
            s.set('runStatus', 'error').set('statusInfo', fromJS((0, _utils.setBadStatus)(action.payload)));
          });
        }

        var _newOne = {
          type: 'implicit',
          id: 1,
          user: 'You',
          desc: 'implicit',
          logonInfo: _objectSpread({}, _config)
        };
        var _temp = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: {},
          user: 'You of course!',
          connections: [_newOne]
        };
        return fromJS(_temp);
      }

    case _actionTypes.VIYA_LOGON_COMPLETE:
      {
        debugger;

        if (action.error === true) {
          return state.withMutations(function (s) {
            s.set('runStatus', 'error').set('statusInfo', fromJS((0, _utils.setBadStatus)(action.payload)));
          });
        }

        var _temp2 = {
          currentConnection: state.get('currentConnection') + 1,
          runStatus: 'ready',
          statusInfo: (0, _utils.setGoodStatus)(action.payload),
          user: action.payload.data.iconfig.user
        };
        return state.withMutations(function (s) {
          //noinspection JSUnresolvedFunction
          s.set('connections', s.get('connections').push(Map(newConnection(action.payload)))).merge(fromJS(_temp2));
        });
      }

    case _actionTypes.VIYA_LOGOFF:
      {
        return state;
      }

    case _actionTypes.BEGIN_LOGOFF:
      {
        return state.set('runStatus', 'busy');
      }

    case _actionTypes.VIYA_LOGOFF_COMPLETE:
      {
        if (action.error === true) {
          return state.withMutations(function (s) {
            s.set('runStatus', 'error').set('statusInfo', fromJS((0, _utils.setBadStatus)(action.payload)));
          });
        }

        return initialState;
      }

    case _actionTypes.KEEP_ALIVE:
      {
        debugger;
        console.log('in keep alive reducer');
        return state;
      }

    default:
      return state;
  }
}

function newConnection(payload) {
  var _payload$data = payload.data,
      results = _payload$data.results,
      iconfig = _payload$data.iconfig;
  debugger;
  return {
    type: 'connection',
    id: 1,
    user: iconfig.user,
    desc: iconfig.desc,
    logonInfo: {
      type: 'trusted',
      host: iconfig.host,
      tokenType: results['token_type'],
      token: results['access_token'],
      pem: iconfig.pem,
      rejectUnauthorized: iconfig.hasOwnProperty('rejectUnauthorized') ? iconfig.rejectUnauthorized : null,
      keepAlive: iconfig.keepAlive == null ? null : iconfig.keepAlive
    },
    statusInfo: (0, _utils.setGoodStatus)(payload)
  };
}

var _default = viyaLogon;
exports.default = _default;