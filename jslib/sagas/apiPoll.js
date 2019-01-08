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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reduxSaga = require("redux-saga");

var _effects = require("redux-saga/effects");

var _httpCallWait = _interopRequireDefault(require("./httpCallWait"));

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiPoll);

function apiPoll(action) {
  var config, payload;
  return _regenerator.default.wrap(function apiPoll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = (0, _objectSpread2.default)({}, action);
          payload = null;
          _context.next = 4;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 4:
          config.logonInfo = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: config.serviceName + '_' + action.type + '_BEGIN',
            config: config
          });

        case 7:
          if (!config.delay) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return (0, _reduxSaga.delay)(config.delay * 1000);

        case 10:
          _context.next = 12;
          return (0, _effects.call)(_httpCallWait.default, config);

        case 12:
          payload = _context.sent;

        case 13:
          if (payload === null) {
            _context.next = 7;
            break;
          }

        case 14:
          _context.next = 16;
          return (0, _effects.put)(payload);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var _default = apiPoll;
exports.default = _default;