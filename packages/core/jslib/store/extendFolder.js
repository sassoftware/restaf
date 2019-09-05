"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getResults = _interopRequireDefault(require("./getResults2"));

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
function extendFolder(store, f) {
  var wrapper = function wrapper(prePath) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _getResults.default)(store, f, prePath, args);
    };
  };

  var wrapperItemsCmd = function wrapperItemsCmd(prePath) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.splice(1, 0, 'cmds');
      return (0, _getResults.default)(store, f, prePath, args);
    };
  };

  return {
    results: wrapper(),
    items: wrapper(['items', 'data']),
    itemsCmd: wrapperItemsCmd(['items', 'data']),
    itemsList: wrapper(['itemsList']),
    links: wrapper(['links']),
    details: wrapper(['details']),
    scrollCmds: wrapper(['scrollCmds']),
    raw: wrapper(['raw']),
    headers: wrapper(['responseHeaders']),
    config: wrapper(['iconfig']),
    host: f.get('host'),
    resultType: f.get('resultType'),
    status: f.get('statusInfo').get('status'),
    statusInfo: f.get('statusInfo').toJS(),
    type: f.get('type'),
    route: f.get('route')
  };
}

var _default = extendFolder;
exports.default = _default;