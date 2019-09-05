"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ijobState = _interopRequireDefault(require("./ijobState"));

var _apiCall = _interopRequireDefault(require("./apiCall"));

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
function jobState(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _jobState.apply(this, arguments);
}

function _jobState() {
  _jobState = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(store, job, payload, maxTries, delay, progressHandler, jobContext) {
    var waitFlag, tries, status, failed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            waitFlag = false;
            tries = 1;

            if (maxTries === 'wait') {
              tries = 1;
              waitFlag = true;
            } else {
              tries = !maxTries ? 1 : maxTries;
            }

          case 3:
            _context.next = 5;
            return (0, _ijobState.default)(store, job, payload, delay, waitFlag, progressHandler, jobContext);

          case 5:
            status = _context.sent;
            failed = status.detail.hasOwnProperty('failed');

            if (!(status.running === 0)) {
              _context.next = 13;
              break;
            }

            tries = 0;

            if (!(failed === false)) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return (0, _apiCall.default)(store, job.links('self'));

          case 12:
            status.jobState.job = _context.sent;

          case 13:
            if (--tries > 0) {
              _context.next = 3;
              break;
            }

          case 14:
            return _context.abrupt("return", status.jobState);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _jobState.apply(this, arguments);
}

var _default = jobState;
exports.default = _default;