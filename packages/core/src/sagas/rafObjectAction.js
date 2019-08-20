/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
'use strict';

import {takeEvery} from 'redux-saga/effects' ;
import  {DELETE_RAF_OBJECT} from '../actionTypes';
import {API_STATUS_ROOT, API_STATUS, API_STATUS_SETSTATE} from '../actionTypes';
import {put} from 'redux-saga/effects';

function* apiDataAction () {
    yield takeEvery([ DELETE_RAF_OBJECT ] , rafObject);
}

function *rafObject (action) {

    let config = {
        type   : DELETE_RAF_OBJECT,
        payload: action
    };
    yield put(config);
}

export default apiDataAction ;