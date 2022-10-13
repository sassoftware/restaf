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

import {delay} from 'redux-saga/effects';
import {put, call, select} from 'redux-saga/effects';

import httpCallWait     from  './httpCallWait' ;
import selectLogonInfo  from '../store/selectLogonInfo';

function *apiPoll (action) {
    let config  = {...action};
    let payload = null;
    config.logonInfo = yield select(selectLogonInfo);
    yield put({type: config.serviceName + '_' + action.type + '_BEGIN', config: config});

    do {
        payload = yield call(httpCallWait, config);
        /* move delay after the first call */
        if (config.delay) {
            yield delay(config.delay * 1000);
        }
    } while (payload === null);

    yield put(payload);
}

export default apiPoll;