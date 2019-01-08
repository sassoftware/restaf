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
exports.default = configureSagaStore;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _sagas = _interopRequireDefault(require("../sagas"));

var _reducers = require("../reducers");

var _injectAsyncReducers = _interopRequireDefault(require("./injectAsyncReducers"));

/**
 *
 * Configure the Redux store with redux-saga middleware. Store extended for SAS Viya
 * @constructor
 */
function configureSagaStore() {
  var sagaMiddleWare = (0, _reduxSaga.default)();
  var store = (0, _redux.createStore)((0, _reducers.createReducer)(), (0, _redux.applyMiddleware)(sagaMiddleWare));
  store.asyncReducers = {};
  store.injectAsyncReducers = _injectAsyncReducers.default;
  store.apiCallNo = 0; //noinspection JSUnresolvedFunction

  sagaMiddleWare.run(_sagas.default);
  return store;
}