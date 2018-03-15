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

import iapiCall  from './iapiCall';
import {API_CALL, API_POLL} from '../actionTypes';

function ijobState (store, job, payload, delay, waitFlag, eventHandler, jobContext) {
    return new Promise((resolve, reject) => {

        let stateCmd = job.links('state');

        if (stateCmd === null) {
            let result   = { job: job, data: 'completed', statusCode: 200 };
            resolve({ completed: 1, running: 0, jobState: result });
        } else {
            iapiCall(store, stateCmd, (waitFlag === true) ? API_POLL : API_CALL, payload, delay,
                     eventHandler, job.route, jobContext)
                .then(r => {
                    let detail = {};
                    let running = 0;

                    let data = r.items();
                    if (detail.hasOwnProperty(data)  === false) {
                        detail [ data ] = 0;
                    }
                    detail [data] = detail[data] + 1;

                    let httpCode  = r.status;
                    let result    = { job: job, data: data, statusCode: httpCode };
                    if  (data === 'running' || data === 'pending') {
                        running = 1;
                    }
                    resolve({ running: running, detail: detail, jobState: result })

                })
                .catch(err => {
                    reject(err);
                })
        }
    })

}

export default ijobState;