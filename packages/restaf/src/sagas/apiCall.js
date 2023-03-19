/*------------------------------------------------------------------------------------
 Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved Licensed under the Apache License, Version 2.0 (the "License");
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

import { delay } from 'redux-saga/effects';
import { put, call, select} from 'redux-saga/effects';

import httpCall         from  './httpCall' ;
import selectLogonInfo  from '../store/selectLogonInfo';

function *apiCall (action) {
    let config = { ...action } ;

    config.logonInfo = yield select(selectLogonInfo);
    yield put({ type: config.serviceName + '_' + action.type + '_BEGIN', config: config });

    if (action.delay > 0) {
        yield delay (action.delay * 1000);
    }
   
    let payload = yield call(httpCall, config);
    
    yield put(payload);
    
}
export default apiCall;