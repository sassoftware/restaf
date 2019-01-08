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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _iaddServices = _interopRequireDefault(require("./iaddServices"));

var _actionTypes = require("../actionTypes");

var _appData = _interopRequireDefault(require("./appData"));

function addServices(_x) {
  return _addServices.apply(this, arguments);
}

function _addServices() {
  _addServices = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(store) {
    var _len,
        services,
        _key,
        _ref,
        folders,
        xsrfTokens,
        service,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, services = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              services[_key - 1] = _args[_key];
            }

            if (services.includes('casManagement')) {
              services.push('casProxy');
            }

            _context.next = 4;
            return (0, _iaddServices.default)(store, services);

          case 4:
            _ref = _context.sent;
            folders = _ref.folders;
            xsrfTokens = _ref.xsrfTokens;

            if (xsrfTokens !== null) {
              for (service in xsrfTokens) {
                (0, _appData.default)(store, _actionTypes.API_XSRF, service, xsrfTokens[service]);
              }
            }

            return _context.abrupt("return", folders);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _addServices.apply(this, arguments);
}

var _default = addServices;
exports.default = _default;