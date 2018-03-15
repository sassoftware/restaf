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

import jobState  from './jobState';
import iapiCall from './iapiCall';
import {API_CALL, API_STATUS} from '../actionTypes';
//store, iroute, actionType, payload, delay, eventHandler, parentRoute, jobContext

async function apiSubmit (store, iroute, payload, delay, jobContext, onCompletion, progress){
    
        if (progress) {
            progress('pending', jobContext);
        }
        
        let job = await iapiCall(store, iroute, API_CALL, payload, 0, null, null, jobContext);
        
        if (job.links('state')) {
            let status = await jobState(store, job, null, 'wait', delay, progress, jobContext);
            completion(store, onCompletion,status.data,status.job, jobContext);
            return status.job;
        } else {
            completion(store, onCompletion, 'unknown', job, jobContext);
            return job;
        }

}
function completion (store, onCompletion, data, job, jobContext){
    let results = {
        data    : data,
        job     : job,
        httpCode: job.status
    };
    saveData(store, results, jobContext);
    if (onCompletion){
        onCompletion(null, results, jobContext);
    }
}

function saveData (store, results, jobContext) {
    let payload = {
        route: results.job.route,
        data : results.data,
        jobContext
    };
    let action = {
        type : API_STATUS,
        route: jobContext,
        payload
    };
    store.dispatch(action);
}
export default apiSubmit;