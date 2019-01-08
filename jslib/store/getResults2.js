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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iGetResults = _interopRequireDefault(require("./iGetResults"));

function getResults2(store, iroute, prePath) {
  var iquery = null;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (args != null && args.length > 0) {
    iquery = Array.isArray(args[0]) === true ? args[0] : args;

    if (prePath !== null) {
      iquery = prePath.concat(iquery);
    }
  } else {
    iquery = prePath;
  }

  return (0, _iGetResults.default)(store, iroute, false, iquery);
}

var _default = getResults2;
exports.default = _default;