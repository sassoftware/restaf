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

var _apiPoll = _interopRequireDefault(require("./apiPoll"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiPollAction);

function apiPollAction() {
  return _regenerator.default.wrap(function apiPollAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)([_actionTypes.API_POLL], _apiPoll.default);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _default = apiPollAction;
exports.default = _default;