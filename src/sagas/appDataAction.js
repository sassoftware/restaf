/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/
'use strict';

import {takeEvery} from 'redux-saga' ;
import {APP_DATA_ROOT, APP_DATA, APP_DATA_SETSTATE} from '../actionTypes';
import {API_STATUS_ROOT, API_STATUS, API_STATUS_SETSTATE} from '../actionTypes';
import {put} from 'redux-saga/effects';

function* apiDataAction () {
    yield *takeEvery([ APP_DATA, API_STATUS ] , appData);
}

function *appData (action) {
    let newType = (action.type === 'APP_DATA')
        ? APP_DATA_ROOT + '_' + APP_DATA_SETSTATE
        : API_STATUS_ROOT + '_' + API_STATUS_SETSTATE;

    let config = {
        type   : newType,
        payload: action
    };
    yield put(config);
}

export default apiDataAction ;