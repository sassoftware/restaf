"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _actionTypes = require("../actionTypes");

var _httpCall = _interopRequireDefault(require("./httpCall"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiCallAllAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(yieldAll),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(setupService);

function apiCallAllAction() {
  return _regenerator.default.wrap(function apiCallAllAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)(_actionTypes.API_CALL_PARALLEL, yieldAll);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function yieldAll(action) {
  var config, actionArray, i, l, result, r;
  return _regenerator.default.wrap(function yieldAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          config = {};
          actionArray = action.actionArray;

          for (i = 0; i < actionArray.length; i++) {
            l = "l".concat(i);
            config[l] = (0, _effects.call)(setupService, actionArray[i]);
          }

          _context2.next = 5;
          return (0, _effects.all)(config);

        case 5:
          result = _context2.sent;
          _context2.t0 = _regenerator.default.keys(result);

        case 7:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 13;
            break;
          }

          r = _context2.t1.value;
          _context2.next = 11;
          return (0, _effects.put)(result[r]);

        case 11:
          _context2.next = 7;
          break;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function setupService(action) {
  var config;
  return _regenerator.default.wrap(function setupService$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          config = _objectSpread({}, action);
          _context3.next = 3;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 3:
          config.logonInfo = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)({
            type: config.serviceName + '_' + config.type + '_BEGIN',
            config: config
          });

        case 6:
          return _context3.abrupt("return", config);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

var _default = apiCallAllAction;
exports.default = _default;