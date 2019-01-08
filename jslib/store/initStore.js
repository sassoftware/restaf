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
exports.default = void 0;

var _configureSagaStore = _interopRequireDefault(require("./configureSagaStore"));

var _actionTypes = require("../actionTypes");

var _injectAsyncReducers = _interopRequireDefault(require("./injectAsyncReducers"));

var _reducers = require("../reducers");

var _apiCall = _interopRequireDefault(require("./apiCall"));

var _apiCallAll = _interopRequireDefault(require("./apiCallAll"));

var _runAction = _interopRequireDefault(require("./runAction"));

var _apiSubmit = _interopRequireDefault(require("./apiSubmit"));

var _jobState = _interopRequireDefault(require("./jobState"));

var _jobStateAll = _interopRequireDefault(require("./jobStateAll"));

var _request = _interopRequireDefault(require("./request"));

var _getServices = _interopRequireDefault(require("./getServices"));

var _addServices = _interopRequireDefault(require("./addServices"));

var _getServiceRoot = _interopRequireDefault(require("./getServiceRoot"));

var _logon = _interopRequireDefault(require("./logon"));

var _logoff = _interopRequireDefault(require("./logoff"));

var _endStore = _interopRequireDefault(require("./endStore"));

var _routeToObj = _interopRequireDefault(require("./routeToObj"));

var _selectLogonInfo = _interopRequireDefault(require("./selectLogonInfo"));

var _appData = _interopRequireDefault(require("./appData"));

var _getXsrfData = _interopRequireDefault(require("./getXsrfData"));

var _deleteRafObject = _interopRequireDefault(require("./deleteRafObject"));

// import jobStatus    from './jobStatus';
function initStore() {
  var store = (0, _configureSagaStore.default)();
  (0, _injectAsyncReducers.default)(store, _actionTypes.API_STATUS_ROOT, (0, _reducers.reducer)(_actionTypes.API_STATUS_ROOT));
  (0, _injectAsyncReducers.default)(store, _actionTypes.APP_DATA_ROOT, (0, _reducers.reducer)(_actionTypes.APP_DATA_ROOT));
  (0, _injectAsyncReducers.default)(store, _actionTypes.API_XSRF_ROOT, (0, _reducers.reducer)(_actionTypes.API_XSRF_ROOT));
  return {
    logon: _logon.default.bind(null, store),
    logoff: _logoff.default.bind(null, store),
    connection: loggedOn.bind(null, store),
    addServices: _addServices.default.bind(null, store),
    getServices: _getServices.default.bind(null, store),
    apiCall: _apiCall.default.bind(null, store),
    runAction: _runAction.default.bind(null, store),
    apiCallAll: _apiCallAll.default.bind(null, store),
    rafObject: _routeToObj.default.bind(null, store),
    deleteRafObject: _deleteRafObject.default.bind(null, store),
    jobState: _jobState.default.bind(null, store),
    jobStateAll: _jobStateAll.default.bind(null, store),
    submit: _apiSubmit.default.bind(null, store),
    submitStatus: getApiStatus.bind(null, store),
    setAppData: _appData.default.bind(null, store, _actionTypes.APP_DATA),
    getAppData: getAppData.bind(null, store),
    setXsrfData: _appData.default.bind(null, store, _actionTypes.API_XSRF),
    getXsrfData: _getXsrfData.default.bind(null, store),
    getState: store.getState,
    endStore: _endStore.default.bind(null, store),
    store: store,
    getServiceRoot: _getServiceRoot.default.bind(null, store),
    request: _request.default
  };
}

function loggedOn(store) {
  return (0, _selectLogonInfo.default)(store.getState());
}

function getAppData(store) {
  var list = store.getState()[_actionTypes.APP_DATA_ROOT];

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var path = args.length > 0 ? ['userData'].concat(args) : ['userData'];
  return list.getIn(path, null);
}

function getApiStatus(store, jobContext) {
  var list = store.getState()[_actionTypes.API_STATUS_ROOT];

  var result = null;

  if (!jobContext) {
    result = list.get('routeList');
  } else {
    var r = list.getIn(['userData', jobContext], null);

    if (r !== null) {
      result = r.toJS();
      result.job = (0, _routeToObj.default)(store, result.route);
    }
  }

  return result;
}

var _default = initStore;
exports.default = _default;