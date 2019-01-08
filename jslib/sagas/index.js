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
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _logonAction = _interopRequireDefault(require("./logonAction"));

var _apiCallAction = _interopRequireDefault(require("./apiCallAction"));

var _apiCallAllAction = _interopRequireDefault(require("./apiCallAllAction"));

var _apiPollAction = _interopRequireDefault(require("./apiPollAction"));

var _appDataAction = _interopRequireDefault(require("./appDataAction"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(rootSaga);

function rootSaga() {
  return _regenerator.default.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return [(0, _logonAction.default)(), (0, _apiCallAction.default)(), (0, _apiCallAllAction.default)(), (0, _apiPollAction.default)(), (0, _appDataAction.default)()];

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var _default = rootSaga;
exports.default = _default;