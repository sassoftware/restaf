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

var _iapiCall = _interopRequireDefault(require("./iapiCall"));

var _actionTypes = require("../actionTypes");

function ijobState(store, job, payload, delay, waitFlag, eventHandler, jobContext) {
  return new Promise(function (resolve, reject) {
    var stateCmd = job.links('state');

    if (stateCmd === null) {
      var result = {
        job: job,
        data: 'completed',
        statusCode: 200
      };
      resolve({
        completed: 1,
        running: 0,
        jobState: result
      });
    } else {
      (0, _iapiCall.default)(store, stateCmd, waitFlag === true ? _actionTypes.API_POLL : _actionTypes.API_CALL, payload, delay, eventHandler, job.route, jobContext).then(function (r) {
        var detail = {};
        var running = 0;
        var data = r.items();

        if (detail.hasOwnProperty(data) === false) {
          detail[data] = 0;
        }

        detail[data] = detail[data] + 1;
        var httpCode = r.status;
        var result = {
          job: job,
          data: data,
          statusCode: httpCode
        };

        if (data === 'running' || data === 'pending') {
          running = 1;
        }

        resolve({
          running: running,
          detail: detail,
          jobState: result
        });
      }).catch(function (err) {
        reject(err);
      });
    }
  });
}

var _default = ijobState;
exports.default = _default;