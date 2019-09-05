"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jobState = _interopRequireDefault(require("./jobState"));

var _iapiCall = _interopRequireDefault(require("./iapiCall"));

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
//store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext
function apiSubmit(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _apiSubmit.apply(this, arguments);
}

function _apiSubmit() {
  _apiSubmit = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(store, iroute, payload, delay, jobContext, onCompletion, progress) {
    var job, status;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (progress) {
              progress('pending', jobContext);
            }

            _context.next = 3;
            return (0, _iapiCall.default)(store, iroute, _actionTypes.API_CALL, payload, 0, null, null, jobContext);

          case 3:
            job = _context.sent;

            if (!job.links('state')) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return (0, _jobState.default)(store, job, null, 'wait', delay, progress, jobContext);

          case 7:
            status = _context.sent;
            completion(store, onCompletion, status.data, status.job, jobContext);
            return _context.abrupt("return", status.job);

          case 12:
            completion(store, onCompletion, 'unknown', job, jobContext);
            return _context.abrupt("return", job);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _apiSubmit.apply(this, arguments);
}

function completion(store, onCompletion, data, job, jobContext) {
  var results = {
    data: data,
    job: job,
    httpCode: job.status
  };
  saveData(store, results, jobContext);

  if (onCompletion) {
    onCompletion(null, results, jobContext);
  }
}

function saveData(store, results, jobContext) {
  var payload = {
    route: results.job.route,
    data: results.data,
    jobContext: jobContext
  };
  var action = {
    type: _actionTypes.API_STATUS,
    route: jobContext,
    payload: payload
  };
  store.dispatch(action);
}

var _default = apiSubmit;
exports.default = _default;