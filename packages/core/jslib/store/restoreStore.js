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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _actionTypes = require("../actionTypes");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function restoreStore(store) {
  var newx = {
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

  var newStore = _objectSpread({
    store: store
  }, newx);

  return newStore;
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

var _default = restoreStore;
exports.default = _default;