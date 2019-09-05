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

require("core-js/modules/es6.object.assign");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es6.regexp.split");

var _responseReducer = _interopRequireDefault(require("./responseReducer"));

var _actionTypes = require("../actionTypes");

var _rootStruct = require("../utils/rootStruct");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Immutable = require('immutable');

var fromJS = Immutable.fromJS;

var baseReducer = function baseReducer(root) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fromJS((0, _rootStruct.tLinkStruct)(root, 'links', root));
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case _actionTypes.DELETE_RAF_OBJECT:
        {
          var searchPath = action.route.split(':/');
          var path = searchPath.slice(1);
          var parent = state.getIn(path);
          var newState = state.deleteIn(path);
          return newState;
        }

      case root + '_' + _actionTypes.ADD_SERVICE + '_BEGIN':
        {
          return state.set('runStatus', 'busy').set('route', root);
        }

      case root + '_' + _actionTypes.ADD_SERVICE + '_COMPLETE':
        {
          var result = (0, _responseReducer.default)(action, [root]);
          result.resultType = 'application/vnd.sas.api';
          result.raw = _objectSpread({}, action.payload);
          result.responseHeaders = _objectSpread({}, result.raw.headers);
          result.route = root; // Need this for potential routing

          return fromJS(result);
        }

      case root + '_' + _actionTypes.API_CALL + '_BEGIN':
      case root + '_' + _actionTypes.API_POLL + '_BEGIN':
        {
          //noinspection JSUnresolvedVariable
          var config = action.config;
          var paginator = config.paginator;

          var _searchPath = config.route.split(':/');

          var _path = _searchPath.slice(paginator === true ? 1 : 2);

          var _parent = state.getIn(_path); // let payload    = {...config.payload };
          // delete payload.route;
          // parent = parent.set( 'runStatus', 'busy' ).set( 'payload', fromJS( payload ) );


          _parent = _parent.set('runStatus', 'busy');
          _path = _searchPath.slice(1);
          return state.setIn(_path, _parent);
        }

      case root + '_' + _actionTypes.API_CALL + '_COMPLETE':
      case root + '_' + _actionTypes.API_POLL + '_COMPLETE':
        {
          /* */
          //noinspection JSUnresolvedVariable
          var _config = action.config;

          var _searchPath2 = _config.route.split(':/');

          var _path2 = _searchPath2.slice(1);

          var raw = Object.assign({}, action.payload);

          var _result = (0, _responseReducer.default)(action, _searchPath2);

          _result.raw = raw;

          if (_result.type === 'links' && _result.resultType == undefined) {
            _result.resultType = 'application/vnd.sas.api';
          }

          var method = action.config.link.method;
          _result.title = action.config.link.href;
          _result.responseHeaders = _objectSpread({}, raw.headers);
          _result.route = _searchPath2.join(':/');
          var newParent = fromJS(_result);
          var nState = state.setIn(_path2, newParent);
          return nState;
        }

      case root + '_' + _actionTypes.APP_DATA + '_SETSTATE':
        {
          var _action$payload = action.payload,
              route = _action$payload.route,
              payload = _action$payload.payload;
          var userData = state.get('userData');

          if (Array.isArray(route)) {
            userData = userData.setIn(route, fromJS(payload));
          } else {
            userData = userData.set(route, fromJS(payload));
          }

          return state.set('userData', userData);
        }

      case root + '_' + _actionTypes.API_XSRF + '_SETSTATE':
        {
          var _action$payload2 = action.payload,
              _route = _action$payload2.route,
              _payload = _action$payload2.payload;

          var _userData = state.get('userData');

          if (Array.isArray(_route)) {
            _userData = _userData.setIn(_route, fromJS(_payload));
          } else {
            _userData = _userData.set(_route, fromJS(_payload));
          }

          return state.set('userData', _userData);
        }

      case root + '_' + _actionTypes.API_STATUS + '_SETSTATE':
        {
          var _payload2 = action.payload.payload;
          var jobContext = _payload2.jobContext;

          var _userData2 = state.get('userData');

          var routeList = state.get('routeList').push(jobContext);
          _userData2 = _userData2.set(jobContext, fromJS(_payload2));
          return state.set('userData', _userData2).set('routeList', routeList);
        }

      default:
        {
          return state;
        }
    }
  };
};

var _default = baseReducer;
exports.default = _default;