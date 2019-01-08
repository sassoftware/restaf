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
/* import uuid from 'uuid' ;*/

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viyaLogon = viyaLogon;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _actionTypes = require("../actionTypes");

var _utils = require("../utils");

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
        /**/
        var config = action.payload;
        /* */

        var newOne = {
          type: 'server',
          id: 1,
          user: 'You',
          desc: 'Server',
          logonInfo: {
            type: 'server',
            host: config.iconfig.host,
            tokenType: null,
            token: null
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
        /* */
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
          logonInfo: (0, _objectSpread2.default)({}, _config)
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
        return initialState;
      }

    default:
      return state;
  }
}

function newConnection(payload) {
  var _payload$data = payload.data,
      results = _payload$data.results,
      iconfig = _payload$data.iconfig;
  return {
    type: 'connection',
    id: 1,
    user: iconfig.user,
    desc: iconfig.desc,
    logonInfo: {
      type: 'trusted',
      host: iconfig.host,
      tokenType: results['token_type'],
      token: results['access_token']
    },
    statusInfo: (0, _utils.setGoodStatus)(payload)
  };
}