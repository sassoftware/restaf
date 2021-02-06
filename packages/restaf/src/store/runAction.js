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
import jobState from './jobState';

async function runAction (store, session, payload,context, onCompletion, maxTries,delay, progress) {
    let actionResult = null;
    if (maxTries != null) {
        actionResult = await submitAction(store, session, payload,context, maxTries, delay, progress);
    } else {
        actionResult = await apiCall(store, session.links('execute'), payload,0);
    }
    if (casError(actionResult) === true) {
        throw JSON.stringify(actionResult.items());
    }
    if (onCompletion != null) {
        onCompletion(context, actionResult);
    }
    return actionResult;
}
function casError (actionResult) {
    let statusCode =  actionResult.items('disposition', 'statusCode');
    let severity   = actionResult.items ('disposition', 'severity');
    return (statusCode !== 0 || (severity === 'Error'||severity === 'Warning') ) ? true : false;
 }

 async function submitAction (store, session, payload,context, maxTries, delay, progress){
     
     let actionPromise = apiCall(store, session.links('execute'), payload,0);     
     let r = await jobState(store, session, null, maxTries, delay, progress, context, true);
     
     let result = actionPromise
     .then(result => {return result;}, 
        err => {return err;});
     return result;
 }

export default runAction;