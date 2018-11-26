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
import apiCall from './apiCall';

async function runAction(store, session, payload, casProxy) {
    let rel = ( casProxy === true ) ? 'casproxy' : 'execute'; /* for debugging casproxy issue  */
    let actionResult = await apiCall(store, session.links(rel), payload, 0);
    if ( casError(actionResult) === true ) {
        throw JSON.stringify(actionResult.items());
    }
    return actionResult;
}
function casError(actionResult) {
    let statusCode =  actionResult.items('disposition', 'statusCode');
    let severity   = actionResult.items ('disposition', 'severity');
    return ( statusCode !== 0 || severity === 'Error') ? true : false;
 }

export default runAction;