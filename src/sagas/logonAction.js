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


import { put, call, take, select } from 'redux-saga/effects';
import selectLogonInfo  from '../store/selectLogonInfo';
import { SASLogonOauthLink} from '../utils';
import { SASLogoffOauthLink} from '../utils';
import { VIYA_LOGON, VIYA_LOGON_COMPLETE, BEGIN_LOGON, VIYA_LOGOFF, VIYA_LOGON_IMPLICIT,
         VIYA_LOGON_SERVER, BEGIN_LOGOFF, VIYA_LOGOFF_COMPLETE } from '../actionTypes';

function*  logonAction () {
    let f = true;
    debugger;
    while (f) {
        let action = yield take(VIYA_LOGON);
        yield put ({ type: BEGIN_LOGON });
        let  payload = yield call (sasLogon, action);
        yield put(payload);
        if (payload.error === false) {
            action           = yield take(VIYA_LOGOFF);
            yield put ({ type: BEGIN_LOGOFF});
            
            let config = {...action};
            config.logonInfo = yield select(selectLogonInfo)
            let payload      = yield call (sasLogoff, config);
            yield put(payload);
           }
    }
}
function sasLogon (action) {
    let config  = { ...action.payload };
    if (config.authType === VIYA_LOGON_SERVER|| config.authType === VIYA_LOGON_IMPLICIT) {
        return {
            type   : config.authType,
            error  : false,
            payload: {
                iconfig: config
            }
        }
    } else {

        let t = SASLogonOauthLink(config.authType);
        config.link = t.link;
        return (t.logon(config)
                  .then(response => viyaLogonSuccess(response))
                  .catch(error => viyaLogonError(error))
        )
    }
}

function viyaLogonSuccess (payload) {
    return {
        type : VIYA_LOGON_COMPLETE,
        error: false,
        payload
    }
}

function viyaLogonError (payload) {
    return {
        type : VIYA_LOGON_COMPLETE,
        error: true,
        payload
    }
}

function sasLogoff (config){
    let t = SASLogoffOauthLink();
    config.link = t.link;
    return (t.logoff(config)
            .then(response => {
                return {type: VIYA_LOGOFF_COMPLETE, error: false, payload: response}
            })
            .catch(error => {
                return {type: VIYA_LOGOFF_COMPLETE, error: true, payload: error}
            })
    )
}

export default logonAction;