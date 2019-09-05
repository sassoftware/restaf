"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverCalls = require("../serverCalls");

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
function httpCall(config) {
  return (0, _serverCalls.request)(config).then(function (response) {
    return httpDone(response, config, false);
  }).catch(function (error) {
    return httpDone(error, config, true);
  });
}

function httpDone(payload, config, error) {
  return {
    error: error,
    type: config.serviceName + '_' + config.type + '_COMPLETE',
    config: config,
    payload: payload
  };
}

var _default = httpCall;
exports.default = _default;