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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _apiCallAll = _interopRequireDefault(require("./apiCallAll"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ijobStateAll(store, jobs, ipayload) {
  return new Promise(function (resolve, reject) {
    /* */
    var payload = [];

    if (ipayload !== null) {
      if (Array.isArray(ipayload) === false) {
        for (var i = 0; i < jobs.length; i++) {
          payload.push(ipayload);
        }
      } else {
        payload = (0, _toConsumableArray2.default)(ipayload);
      }
    } else {
      for (var _i = 0; _i < jobs.length; _i++) {
        payload.push(null);
      }
    }

    var actionArray = jobs.map(function (job, i) {
      //noinspection JSValidateTypes
      var rafLink = job.links('state');

      if (rafLink === null) {
        reject(" job ".concat(i, " does not support state checking "));
      }

      var statePayload = payload[i];
      return {
        rafLink: rafLink,
        payload: _objectSpread({}, statePayload)
      };
    });
    (0, _apiCallAll.default)(store, actionArray).then(function (results) {
      var detail = {};
      var running = 0;
      var jobState = results.map(function (r, i) {
        var data = r.items();
        var httpCode = r.status;

        if (detail.hasOwnProperty(data) === false) {
          detail[data] = 0;
        }

        detail[data] = detail[data] + 1;

        if (data === 'running' || data === 'pending') {
          running++;
        }

        return {
          job: jobs[i],
          data: data,
          statusCode: httpCode
        };
      });
      resolve({
        running: running,
        detail: detail,
        jobState: jobState
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

var _default = ijobStateAll;
exports.default = _default;