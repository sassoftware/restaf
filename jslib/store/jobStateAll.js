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

var _ijobStateAll = _interopRequireDefault(require("./ijobStateAll"));

var _apiCallAll = _interopRequireDefault(require("./apiCallAll"));

function jobStateAll(store, jobList, payload, maxTries) {
  return new Promise(function (resolve, reject) {
    var tries = maxTries != null ? maxTries : 1;
    checkStatus(store, jobList, payload, tries, function (err, result) {
      if (err) {
        reject(err);
      } else if (result.running === 0) {
        var rafLinkSelf = result.jobState.map(function (j) {
          return {
            rafLink: j.job.links('self'),
            payload: null
          };
        });
        (0, _apiCallAll.default)(store, rafLinkSelf, null).then(function (newJobs) {
          newJobs.forEach(function (job, i) {
            result.jobState[i].job = job;
          });
          resolve(result);
        }).catch(function (err) {
          reject(err);
        });
      } else {
        resolve(result);
      }
    });
  });
}

function checkStatus(store, jobList, payload, tries, cb) {
  (0, _ijobStateAll.default)(store, jobList, payload).then(function (result) {
    if (result.running > 0) {
      tries--;

      if (tries <= 0) {
        cb(null, result);
      } else {
        checkStatus(store, jobList, payload, tries, cb);
      }
    } else {
      cb(null, result);
    }
  }).catch(function (err) {
    cb(err);
  });
}

var _default = jobStateAll;
exports.default = _default;