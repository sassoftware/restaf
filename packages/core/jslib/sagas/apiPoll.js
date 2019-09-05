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

var _httpCallWait = _interopRequireDefault(require("./httpCallWait"));

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(apiPoll);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function apiPoll(action) {
  var config, payload;
  return _regenerator.default.wrap(function apiPoll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = _objectSpread({}, action);
          payload = null;
          _context.next = 4;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 4:
          config.logonInfo = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: config.serviceName + '_' + action.type + '_BEGIN',
            config: config
          });

        case 7:
          if (!config.delay) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return (0, _effects.delay)(config.delay * 1000);

        case 10:
          _context.next = 12;
          return (0, _effects.call)(_httpCallWait.default, config);

        case 12:
          payload = _context.sent;

        case 13:
          if (payload === null) {
            _context.next = 7;
            break;
          }

        case 14:
          _context.next = 16;
          return (0, _effects.put)(payload);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _default = apiPoll;
exports.default = _default;