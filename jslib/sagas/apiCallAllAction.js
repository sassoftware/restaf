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

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _actionTypes = require("../actionTypes");

var _httpCall = _interopRequireDefault(require("./httpCall"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiCallAllAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(yieldAll),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(setupService);

function apiCallAllAction() {
  return _regenerator.default.wrap(function apiCallAllAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_actionTypes.API_CALL_PARALLEL, yieldAll);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function yieldAll(action) {
  var config, actionArray, i, l, result, r;
  return _regenerator.default.wrap(function yieldAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          config = {};
          actionArray = action.actionArray;

          for (i = 0; i < actionArray.length; i++) {
            l = "l".concat(i);
            config[l] = (0, _effects.call)(setupService, actionArray[i]);
          }

          _context2.next = 5;
          return (0, _effects.all)(config);

        case 5:
          result = _context2.sent;
          _context2.t0 = _regenerator.default.keys(result);

        case 7:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 13;
            break;
          }

          r = _context2.t1.value;
          _context2.next = 11;
          return (0, _effects.put)(result[r]);

        case 11:
          _context2.next = 7;
          break;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function setupService(action) {
  var config;
  return _regenerator.default.wrap(function setupService$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          config = (0, _objectSpread2.default)({}, action);
          _context3.next = 3;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 3:
          config.logonInfo = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)({
            type: config.serviceName + '_' + config.type + '_BEGIN',
            config: config
          });

        case 6:
          return _context3.abrupt("return", config);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

var _default = apiCallAllAction;
exports.default = _default;