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

require("core-js/modules/es6.string.link");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("regenerator-runtime/runtime");

var _effects = require("redux-saga/effects");

var _selectLogonInfo = _interopRequireDefault(require("../store/selectLogonInfo"));

var _utils = require("../utils");

var _actionTypes = require("../actionTypes");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(logonAction),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(keepAlive);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function logonAction() {
  var f, action, payload, config, _payload;

  return _regenerator.default.wrap(function logonAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          f = true;

        case 1:
          if (!f) {
            _context.next = 30;
            break;
          }

          _context.next = 4;
          return (0, _effects.take)(_actionTypes.VIYA_LOGON);

        case 4:
          action = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: _actionTypes.BEGIN_LOGON
          });

        case 7:
          _context.next = 9;
          return (0, _effects.call)(sasLogon, action);

        case 9:
          payload = _context.sent;
          payload.keepAlive = action.payload.keepAlive == null ? null : action.payload.keepAlive;
          _context.next = 13;
          return (0, _effects.put)(payload);

        case 13:
          if (!(payload.error === false)) {
            _context.next = 28;
            break;
          }

          _context.next = 16;
          return (0, _effects.take)(_actionTypes.VIYA_LOGOFF);

        case 16:
          action = _context.sent;
          _context.next = 19;
          return (0, _effects.put)({
            type: _actionTypes.BEGIN_LOGOFF
          });

        case 19:
          config = _objectSpread({}, action);
          _context.next = 22;
          return (0, _effects.select)(_selectLogonInfo.default);

        case 22:
          config.logonInfo = _context.sent;
          _context.next = 25;
          return (0, _effects.call)(sasLogoff, config);

        case 25:
          _payload = _context.sent;
          _context.next = 28;
          return (0, _effects.put)(_payload);

        case 28:
          _context.next = 1;
          break;

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function keepAlive(payload) {
  var doit, r;
  return _regenerator.default.wrap(function keepAlive$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          doit = true;
          debugger;

        case 2:
          if (!doit) {
            _context2.next = 11;
            break;
          }

          _context2.next = 5;
          return (0, _effects.delay)(2000);

        case 5:
          debugger;
          _context2.next = 8;
          return (0, _effects.call)(test, payload);

        case 8:
          r = _context2.sent;
          _context2.next = 2;
          break;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function sasLogon(action) {
  debugger;

  var config = _objectSpread({}, action.payload);

  if (config.authType === _actionTypes.VIYA_LOGON_SERVER || config.authType === _actionTypes.VIYA_LOGON_IMPLICIT) {
    return {
      type: config.authType,
      error: false,
      payload: {
        iconfig: config
      }
    };
  } else {
    var t = (0, _utils.SASLogonOauthLink)(config.authType);
    config.link = t.link;
    return t.logon(config).then(function (response) {
      return viyaLogonSuccess(response);
    }).catch(function (error) {
      return viyaLogonError(error);
    });
  }
}

function test(action) {
  var t = (0, _utils.SASLogonOauthLink)('keepAlive');
  return t.keepAlive(action);
}

function viyaLogonSuccess(payload) {
  return {
    type: _actionTypes.VIYA_LOGON_COMPLETE,
    error: false,
    payload: payload
  };
}

function viyaLogonError(payload) {
  return {
    type: _actionTypes.VIYA_LOGON_COMPLETE,
    error: true,
    payload: payload
  };
}

function sasLogoff(config) {
  var t = (0, _utils.SASLogoffOauthLink)();
  config.link = t.link;
  return t.logoff(config).then(function (response) {
    return {
      type: _actionTypes.VIYA_LOGOFF_COMPLETE,
      error: false,
      payload: response
    };
  }).catch(function (error) {
    return {
      type: _actionTypes.VIYA_LOGOFF_COMPLETE,
      error: true,
      payload: error
    };
  });
}

var _default = logonAction;
exports.default = _default;