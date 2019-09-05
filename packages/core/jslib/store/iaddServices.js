"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _actionTypes = require("../actionTypes");

var _getResults = _interopRequireDefault(require("./getResults"));

var _extendFolder = _interopRequireDefault(require("./extendFolder"));

var _injectAsyncReducers = _interopRequireDefault(require("../reducers/injectAsyncReducers"));

var _baseReducer = _interopRequireDefault(require("../reducers/baseReducer"));

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
var iaddServices = function iaddServices(store, services) {
  return new Promise(function (resolve, reject) {
    //
    // Add a reducer for each service
    //
    services.forEach(function (service) {
      (0, _injectAsyncReducers.default)(store, service, (0, _baseReducer.default)(service));
    }); //
    // Create actionArray for the services
    //

    var actionArray = services.map(function (service) {
      return {
        type: _actionTypes.ADD_SERVICE,
        link: {
          method: 'GET',
          href: '/' + service + '/',
          rel: 'root',
          type: 'application/vnd.sas.api+json',
          responseType: 'application/json, application/vnd.sas.api+json',
          uri: '/' + service + '/'
        },
        logonInfo: null,
        tLink: null,

        /* null indicates root of service */
        serviceName: service,
        route: service
      };
    }); //
    // The first callback needs to be ignored
    //

    var start = true; //
    // subscribe function
    //

    var nextE = function nextE() {
      debugger;

      if (start) {
        start = false;
        return;
      }

      var folders = {};
      var xsrfTokens = {};
      /* */
      //
      // check the status of the call.
      // if all of them completed then resolve this promise or reject if error as soon as
      // an error is detected.
      //

      var count = 0;

      for (var i = 0; i < actionArray.length; i++) {
        //noinspection JSUnresolvedVariable
        var f = (0, _getResults.default)(store, actionArray[i].route);

        if (f !== null) {
          var runStatus = f.get('runStatus');

          if (runStatus === 'error') {
            unSubscribe();
            var err = {
              service: services[i],
              detail: f.get('statusInfo')
            };
            reject(err);
          } else if (runStatus === 'ready') {
            count++;
            var ff = (0, _extendFolder.default)(store, f);
            folders[services[i]] = ff;
            var xheader = ff.headers('x-csrf-header');

            if (xheader !== null) {
              var xtoken = ff.headers('x-csrf-token');
              var xx = {
                'x-csrf-header': xheader,
                'x-csrf-token': xtoken
              };
              xsrfTokens[services[i]] = xx;
            } else {
              xsrfTokens[services[i]] = null;
            }
          }
        }
      }

      if (count === actionArray.length) {
        unSubscribe();
        resolve({
          folders: folders,
          xsrfTokens: xsrfTokens
        });
      }
    }; //
    // subscribe to store
    //


    var unSubscribe = store.subscribe(nextE); //
    // dispatch the actionArray
    //
    //
    // interval is a place holder for creating interval between calls
    // Yet to be implemented
    //

    store.dispatch({
      type: _actionTypes.API_CALL_PARALLEL,
      interval: -1,
      actionArray: actionArray
    });
  });
};

var _default = iaddServices;
exports.default = _default;