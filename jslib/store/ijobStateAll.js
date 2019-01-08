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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _apiCallAll = _interopRequireDefault(require("./apiCallAll"));

function ijobStateAll(store, jobs, ipayload) {
  return new Promise(function (resolve, reject) {
    /* */
    var payload = [];

    if (ipayload !== null) {
      if (Array.isArray(ipayload) === false) {
        for (var i = 0; i < jobs.length; i++) {
          payload.push(ipayload);
        }
      } else {
        payload = (0, _toConsumableArray2.default)(ipayload);
      }
    } else {
      for (var _i = 0; _i < jobs.length; _i++) {
        payload.push(null);
      }
    }

    var actionArray = jobs.map(function (job, i) {
      //noinspection JSValidateTypes
      var rafLink = job.links('state');

      if (rafLink === null) {
        reject(" job ".concat(i, " does not support state checking "));
      }

      var statePayload = payload[i];
      return {
        rafLink: rafLink,
        payload: (0, _objectSpread2.default)({}, statePayload)
      };
    });
    (0, _apiCallAll.default)(store, actionArray).then(function (results) {
      var detail = {};
      var running = 0;
      var jobState = results.map(function (r, i) {
        var data = r.items();
        var httpCode = r.status;

        if (detail.hasOwnProperty(data) === false) {
          detail[data] = 0;
        }

        detail[data] = detail[data] + 1;

        if (data === 'running' || data === 'pending') {
          running++;
        }

        return {
          job: jobs[i],
          data: data,
          statusCode: httpCode
        };
      });
      resolve({
        running: running,
        detail: detail,
        jobState: jobState
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

var _default = ijobStateAll;
exports.default = _default;