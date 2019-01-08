/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _utils = require("../utils");

var _actionTypes = require("../actionTypes");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(logonAction);

function logonAction() {
  var f, action, payload, _payload;

  return _regenerator.default.wrap(function logonAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          f = true;

        case 1:
          if (!f) {
            _context.next = 20;
            break;
          }

          _context.next = 4;
          return (0, _effects.take)(_actionTypes.VIYA_LOGON);

        case 4:
          action = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: _actionTypes.BEGIN_LOGON
          });

        case 7:
          _context.next = 9;
          return (0, _effects.call)(sasLogon, action);

        case 9:
          payload = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(payload);

        case 12:
          if (!(payload.error === false)) {
            _context.next = 18;
            break;
          }

          _context.next = 15;
          return (0, _effects.take)(_actionTypes.VIYA_LOGOFF);

        case 15:
          _payload = {
            type: _actionTypes.VIYA_LOGOFF,
            payload: null
          };
          _context.next = 18;
          return (0, _effects.put)(_payload);

        case 18:
          _context.next = 1;
          break;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function sasLogon(action) {
  var config = (0, _objectSpread2.default)({}, action.payload);
  /* */

  if (config.authType === _actionTypes.VIYA_LOGON_SERVER || config.authType === _actionTypes.VIYA_LOGON_IMPLICIT) {
    return {
      type: config.authType,
      error: false,
      payload: {
        iconfig: config
      }
    };
  } else {
    var t = (0, _utils.SASLogonOauthLink)(config.authType);
    config.link = t.link;
    return t.logon(config).then(function (response) {
      return viyaLogonSuccess(response);
    }).catch(function (error) {
      return viyaLogonError(error);
    });
  }
}

function viyaLogonSuccess(payload) {
  return {
    type: _actionTypes.VIYA_LOGON_COMPLETE,
    error: false,
    payload: payload
  };
}

function viyaLogonError(payload) {
  return {
    type: _actionTypes.VIYA_LOGON_COMPLETE,
    error: true,
    payload: payload
  };
}

var _default = logonAction;
exports.default = _default;