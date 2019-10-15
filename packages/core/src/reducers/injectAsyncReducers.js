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

import createReducer  from './createReducer';
// https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application/33044701#33044701
const injectAsyncReducers = function (store, name, asyncReducer) {

    if (store.asyncReducers.hasOwnProperty(name)) {
        delete store.asyncReducers[ name ]
    }

    store.asyncReducers[ name ] = asyncReducer;
    
    store.replaceReducer(createReducer(store.asyncReducers));

};

export default injectAsyncReducers;