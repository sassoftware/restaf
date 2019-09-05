"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apiCall = _interopRequireDefault(require("./apiCall"));

/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
function runAction(_x, _x2, _x3) {
  return _runAction.apply(this, arguments);
}

function _runAction() {
  _runAction = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(store, session, payload) {
    var rel, actionResult;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rel = store.config.casProxy === true ? 'casproxy' : 'execute';
            /* fix for issues with casproxy */

            _context.next = 3;
            return (0, _apiCall.default)(store, session.links(rel), payload, 0);

          case 3:
            actionResult = _context.sent;

            if (!(casError(actionResult) === true)) {
              _context.next = 6;
              break;
            }

            throw JSON.stringify(actionResult.items());

          case 6:
            return _context.abrupt("return", actionResult);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runAction.apply(this, arguments);
}

function casError(actionResult) {
  var statusCode = actionResult.items('disposition', 'statusCode');
  var severity = actionResult.items('disposition', 'severity');
  return statusCode !== 0 || severity === 'Error' ? true : false;
}

var _default = runAction;
exports.default = _default;