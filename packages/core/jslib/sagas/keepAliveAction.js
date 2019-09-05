"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _actionTypes = require("../actionTypes");

var _utils = require("../utils");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(keepAliveAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(keepAlivei);

function keepAliveAction() {
  var action;
  return _regenerator.default.wrap(function keepAliveAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          debugger;
          _context.next = 3;
          return (0, _effects.takeLatest)(_actionTypes.KEEP_ALIVE, keepAlivei);

        case 3:
          action = _context.sent;
          // yield put({ type: KEEP_ALIVE});
          console.log('keepAlive');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function keepAlivei(payload) {
  var r;
  return _regenerator.default.wrap(function keepAlivei$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('detected keepAlive');
          _context2.next = 3;
          return (0, _effects.spawn)(test, payload);

        case 3:
          r = _context2.sent;
          return _context2.abrupt("return", r);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function test(action) {
  var t = (0, _utils.SASLogonOauthLink)('keepAlive');
  return t.keepAlive(action);
}

var _default = keepAliveAction;
exports.default = _default;