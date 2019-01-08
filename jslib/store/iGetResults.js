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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var Immutable = require('immutable');

function iGetResults(store, iroute, keyOnly) {
  var result;
  var route;
  var iquery = [];
  var q;
  var serviceName;
  var folder;
  var path = [];

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (args != null) {
    iquery = Array.isArray(args[0]) === true ? args[0] : args;
  }

  if (typeof iroute === 'string') {
    route = iroute;
    q = route.split(':/');
    serviceName = q.shift();
    folder = store.getState()[serviceName];
    path = (0, _toConsumableArray2.default)(q).concat((0, _toConsumableArray2.default)(iquery));
  } else {
    path = iquery;

    if (Immutable.Iterable.isIterable(iroute)) {
      folder = iroute;
    } else {
      return null;
    }
  } // should never happen but...


  if (folder == null) {
    return null;
  }

  result = path.length > 0 ? folder.getIn(path, null) : folder;

  if (result !== null) {
    if (keyOnly === true && Immutable.Iterable.isIterable(result) === true) {
      result = result.keySeq();
    }
  }

  return result;
}

var _default = iGetResults;
exports.default = _default;