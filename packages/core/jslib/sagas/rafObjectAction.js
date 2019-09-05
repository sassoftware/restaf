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

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiDataAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(rafObject);

function apiDataAction() {
  return _regenerator.default.wrap(function apiDataAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)([_actionTypes.DELETE_RAF_OBJECT], rafObject);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function rafObject(action) {
  var config;
  return _regenerator.default.wrap(function rafObject$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          config = {
            type: _actionTypes.DELETE_RAF_OBJECT,
            payload: action
          };
          _context2.next = 3;
          return (0, _effects.put)(config);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var _default = apiDataAction;
exports.default = _default;