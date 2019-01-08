/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _responseReducer = require("./responseReducer");

var _actionTypes = require("../actionTypes");

var _rootStruct = require("../utils/rootStruct");

var Immutable = require('immutable');

var fromJS = Immutable.fromJS;

var reducer = function reducer(root) {
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
          var result = (0, _responseReducer.responseReducer)(action, [root]);
          result.resultType = 'application/vnd.sas.api';
          result.raw = (0, _objectSpread2.default)({}, action.payload);
          result.responseHeaders = (0, _objectSpread2.default)({}, result.raw.headers);
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

          var _result = (0, _responseReducer.responseReducer)(action, _searchPath2);

          _result.raw = raw;

          if (_result.type === 'links' && _result.resultType == undefined) {
            _result.resultType = 'application/vnd.sas.api';
          }

          var method = action.config.link.method;
          _result.title = action.config.link.href;
          _result.responseHeaders = (0, _objectSpread2.default)({}, raw.headers);
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

exports.reducer = reducer;