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

import { all, put, call, select  } from 'redux-saga/effects';

import { takeEvery }          from 'redux-saga/effects' ;
import  selectLogonInfo       from '../store/selectLogonInfo';
import {  API_CALL_PARALLEL } from '../actionTypes';
import httpCall               from './httpCall';


function* apiCallAllAction () {
    yield takeEvery(API_CALL_PARALLEL, yieldAll);
}

function *yieldAll (action) {
   
    let config = {};
    let actionArray = action.actionArray;

    for (let i = 0 ; i < actionArray.length ; i++) {
        let l = `l${i}`;
        config[l] = call (setupService, actionArray[ i ]);
    }
 
    let result = yield all(config);

    for( let r in result) {
       yield put (result[r]);
    }

    /*
    let configs = [];
    for (let i = 0 ; i < actionArray.length ; i++) {
        let c = yield call (setupService, actionArray[ i ]);
        configs.push (c);
    }

    let result = yield all (configs.map(c => call(httpCall, c)));
    for (let i = 0 ; i < result.length ; i++) {
        yield put (result [ i ]);
    }
    */

}

function *setupService (action) {
    let config = { ...action } ;
    config.logonInfo = yield select(selectLogonInfo);
    yield put({ type: config.serviceName + '_' + config.type + '_BEGIN', config: config });
    return config;
}


export default apiCallAllAction;