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

import ijobState from './ijobState';
import apiCall from './apiCall';

async function jobState (store, job, payload, maxTries, delay, progressHandler, jobContext) {
    let waitFlag = false;
    let tries    = 1;
    let status;
    if (maxTries === 'wait') {
        tries    = 1;
        waitFlag = true;
    } else {
        tries = (!maxTries) ? 1 : maxTries;
    }
    do {
        status = await ijobState(store, job, payload, delay, waitFlag, progressHandler, jobContext);
        if (status.running === 0) {
            tries = 0;
            status.jobState.job = await apiCall(store, job.links('self'));
        }

    } while (--tries > 0);
    return status.jobState;
}

export default jobState;