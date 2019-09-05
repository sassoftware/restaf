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
_regenerator.default.mark(appData);

function apiDataAction() {
  return _regenerator.default.wrap(function apiDataAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)([_actionTypes.APP_DATA, _actionTypes.API_STATUS, _actionTypes.API_XSRF], appData);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function appData(action) {
  var newType, config;
  return _regenerator.default.wrap(function appData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = action.type;
          _context2.next = _context2.t0 === _actionTypes.APP_DATA ? 3 : _context2.t0 === _actionTypes.API_STATUS ? 5 : 7;
          break;

        case 3:
          newType = _actionTypes.APP_DATA_ROOT + '_' + _actionTypes.APP_DATA_SETSTATE;
          return _context2.abrupt("break", 9);

        case 5:
          newType = _actionTypes.API_STATUS_ROOT + '_' + _actionTypes.API_STATUS_SETSTATE;
          return _context2.abrupt("break", 9);

        case 7:
          newType = _actionTypes.API_XSRF_ROOT + '_' + _actionTypes.API_XSRF_SETSTATE;
          return _context2.abrupt("break", 9);

        case 9:
          config = {
            type: newType,
            payload: action
          };
          _context2.next = 12;
          return (0, _effects.put)(config);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var _default = apiDataAction;
exports.default = _default;