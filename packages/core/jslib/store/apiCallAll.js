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

var _prepareAction = _interopRequireDefault(require("./prepareAction"));

var _extendFolder = _interopRequireDefault(require("./extendFolder"));

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
var apiCallAll = function apiCallAll(store, allActions, delay) {
  return new Promise(function (resolve, reject) {
    //
    // create actionArray
    //
    var actionArray = allActions.map(function (acti) {
      //noinspection JSUnresolvedVariable
      var iroute = acti.rafLink;
      var payload = acti.hasOwnProperty('payload') === true ? acti.payload : null;
      var action = (0, _prepareAction.default)(store, iroute, _actionTypes.API_CALL, payload, delay, null, null, null);

      if (action === null) {
        reject({
          err: 'Invalid route and/or rafLink',
          args: JSON.stringify(acti, null, 4)
        });
      }

      return action;
    }); //
    // set start state
    //

    var start = true; //
    // subscribe callback
    //

    var nextE = function nextE() {
      if (start) {
        start = false;
        return;
      }

      var folders = []; //
      // check for completion
      //

      for (var i = 0; i < actionArray.length; i++) {
        //noinspection JSUnresolvedVariable
        var f = (0, _getResults.default)(store, actionArray[i].route);

        if (f !== null) {
          var runStatus = f.get('runStatus');

          if (runStatus === 'error') {
            unSubscribe();
            var err = {
              jobNo: i,
              detail: f.get('statusInfo')
            };
            reject(err);
          } else if (runStatus === 'ready') {
            folders.push((0, _extendFolder.default)(store, f));
          }
        }
      } //
      // If all done the resolve promise
      //


      if (folders.length === actionArray.length) {
        resolve(folders);
      }
    }; //
    // subscribe to store
    //


    var unSubscribe = store.subscribe(nextE); //
    // dispatch array actions
    // interval is place holder - TBD
    //

    store.dispatch({
      type: _actionTypes.API_CALL_PARALLEL,
      actionArray: actionArray
    });
  });
};

var _default = apiCallAll;
exports.default = _default;