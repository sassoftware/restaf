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
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actionTypes = require("../actionTypes");

var _immutable = _interopRequireDefault(require("immutable"));

function deleteRafObject(store, iroute) {
  var route = null;

  if (typeof iroute === 'string') {
    route = iroute;
  } else if (_immutable.default.Iterable.isIterable(iroute) === true) {
    route = iroute.get('route');
  }

  if (iroute !== null) {
    var action = {
      type: _actionTypes.DELETE_RAF_OBJECT,
      route: route
    };
    store.dispatch(action);
  }
}

var _default = deleteRafObject;
exports.default = _default;