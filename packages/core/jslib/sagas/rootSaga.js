"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _logonAction = _interopRequireDefault(require("./logonAction"));

var _apiCallAction = _interopRequireDefault(require("./apiCallAction"));

var _apiCallAllAction = _interopRequireDefault(require("./apiCallAllAction"));

var _apiPollAction = _interopRequireDefault(require("./apiPollAction"));

var _appDataAction = _interopRequireDefault(require("./appDataAction"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(rootSaga);

// import keepAliveAction   from './keepAliveAction';
function rootSaga() {
  return _regenerator.default.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.all)([(0, _logonAction.default)(), (0, _apiCallAction.default)(), (0, _apiCallAllAction.default)(), (0, _apiPollAction.default)(), (0, _appDataAction.default)() // keepAliveAction()
          ]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _default = rootSaga;
exports.default = _default;