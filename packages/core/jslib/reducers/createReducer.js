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

var _redux = require("redux");

var _baseReducer = _interopRequireDefault(require("./baseReducer"));

var _viyaLogon = _interopRequireDefault(require("./viyaLogon"));

var _actionTypes = require("../actionTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createReducer = function createReducer(asyncReducer) {
  var reducerList = {};
  reducerList['connections'] = _viyaLogon.default;
  reducerList[_actionTypes.API_STATUS_ROOT] = (0, _baseReducer.default)(_actionTypes.API_STATUS_ROOT);
  reducerList[_actionTypes.APP_DATA_ROOT] = (0, _baseReducer.default)(_actionTypes.APP_DATA_ROOT);
  reducerList[_actionTypes.API_XSRF_ROOT] = (0, _baseReducer.default)(_actionTypes.API_XSRF_ROOT);
  reducerList = _objectSpread({}, reducerList, {}, asyncReducer);
  return (0, _redux.combineReducers)(reducerList);
};

var _default = createReducer;
exports.default = _default;