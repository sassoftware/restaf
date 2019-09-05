"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _httpCall = _interopRequireDefault(require("./httpCall"));

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiCall);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function apiCall(action) {
  var config, payload;
  return _regenerator.default.wrap(function apiCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = _objectSpread({}, action);
          _context.next = 3;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 3:
          config.logonInfo = _context.sent;
          _context.next = 6;
          return (0, _effects.put)({
            type: config.serviceName + '_' + action.type + '_BEGIN',
            config: config
          });

        case 6:
          if (!(action.delay > 0)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return (0, _effects.delay)(action.delay * 1000);

        case 9:
          _context.next = 11;
          return (0, _effects.call)(_httpCall.default, config);

        case 11:
          payload = _context.sent;
          debugger;
          _context.next = 15;
          return (0, _effects.put)(payload);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _default = apiCall;
exports.default = _default;