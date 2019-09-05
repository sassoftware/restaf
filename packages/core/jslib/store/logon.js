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

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.replace");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _actionTypes = require("../actionTypes");

var _queryString = _interopRequireDefault(require("query-string"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var logon = function logon(store, ipayload) {
  return new Promise(function (resolve, reject) {
    var unSubscribe;
    var action;
    var implicitLogon = false;
    var urlInfo = null;
    var payload = ipayload == null ? null : _objectSpread({}, ipayload);

    if (store.getState().connections.get('currentConnection') >= 0) {
      resolve('ready');
    } else {
      var logonExit = function logonExit() {
        var newState = store.getState().connections;
        var runStatus = newState.get('runStatus');

        if (runStatus === 'ready') {
          unSubscribe();
          resolve(runStatus);
        } else if (runStatus === 'error') {
          unSubscribe();
          reject(newState.get('statusInfo').toJS());
        }
      }; //
      // check url if not password (no window) or when payload is null
      // this allows users of restaf-server to LOGONPAYLOAD unconditionally to logon
      //


      if (payload === null || payload.authType !== _actionTypes.VIYA_LOGON_PASSWORD) {
        urlInfo = parseUrl();

        if (payload !== null && urlInfo !== null) {
          payload = _objectSpread({}, payload, {}, urlInfo);
        }
      }

      if (payload == null) {
        if (urlInfo !== null) {
          payload = urlInfo;
        } else {
          payload = {
            host: "".concat(window.location.protocol, "//").concat(window.location.host),
            authType: _actionTypes.VIYA_LOGON_SERVER
          };
        }
      } // now make the final decision


      switch (payload.authType) {
        case _actionTypes.VIYA_LOGON_SERVER:
          if (payload.host == null) {
            payload.host = "".concat(window.location.protocol, "//").concat(window.location.host);
          }

          break;

        case _actionTypes.VIYA_LOGON_IMPLICIT:
          if (!payload.hasOwnProperty('token')) {
            implicitLogon = true;
            getToken(payload);
            resolve('Implicit Call');
          }

          break;

        case "LOGOFF":
          break;

        default:
          break;
      }

      if (!implicitLogon) {
        action = {
          type: payload.authType === 'LOGOFF' ? _actionTypes.VIYA_LOGOFF : _actionTypes.VIYA_LOGON,
          payload: _objectSpread({}, payload)
        };
        action.payload.pem = store.config.hasOwnProperty('pem') ? store.config.pem : null;
        action.payload.rejectUnauthorized = store.config.hasOwnProperty('rejectUnauthorized') ? store.config.rejectUnauthorized : null;
        unSubscribe = store.subscribe(logonExit);
        store.dispatch(action);
      }
    }
  });
};

function getToken(payload) {
  var x = "".concat(payload.host, "/SASLogon/oauth/authorize?response_type=token&client_id=").concat(payload.clientID); //noinspection JSUnresolvedVariable

  if (payload.redirect != null) {
    //noinspection JSUnresolvedVariable
    var redirectUri = "".concat(window.location.protocol, "//").concat(window.location.host, "/").concat(payload.redirect, "?host=").concat(payload.host);
    x = "".concat(x, "&redirect_uri=").concat(redirectUri);
  }

  window.location.replace(x);
} // only parse for implicit callback


function parseUrl() {
  var payload = null;
  debugger;

  if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
    var windowLocation = window.location;

    var host = _queryString.default.parse(windowLocation.search);

    var loc = _queryString.default.parse(windowLocation.hash);

    if (loc.access_token == null) {
      return null;
    } //


    payload = {};

    if (host !== null && host.host !== null) {
      payload.host = host.host; //noinspection JSUnresolvedVariable

      payload.tokenType = loc.token_type != null ? loc.token_type : null; //noinspection JSUnresolvedVariable

      payload.token = loc.access_token != null ? loc.access_token : null;

      if (payload.token !== null) {
        payload.authType = _actionTypes.VIYA_LOGON_IMPLICIT;
      }
    } //

    /*
      payload = {
          host     : host.host,
          token    : loc['access_token'],
          tokenType: loc['token_type'],
          authType : VIYA_LOGON_IMPLICIT
      };
      */

  }

  return payload;
}

var _default = logon;
exports.default = _default;