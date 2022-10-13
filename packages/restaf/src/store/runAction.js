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
/**
 * @Description Run a given action
 * @async
 * @module runAction
 * @category restaf/core
 * @param {rafObject} session - cas session
 * @param {casPayload} payload - payload for cas actions
 * @returns {promise} returns rafObject
 * @example
 * 
let restaf     = require("@sassoftware/restaf");
let payload    = require('./config')();
let {casSetup} = require("@sassoftware/restaflib");

let prtUtil = require("./prtUtil");

let store = restaf.initStore({casProxy: true});
async function example () {
  console.log(payload);
  let { session } = await casSetup(store, payload, "cas");

  let p = {
    action: "echo",
    data  : { code: "data casuser.data1; x=1;put x= ; run; " }
  };
 
  let r = await store.runAction(session, p);
  console.log(JSON.stringify(r.items(), null, 4));
  return "done";
}

example()
  .then(r => console.log(r))
  .catch(err => console.log(err));
  
 */

async function runAction (store, session, payload,context, onCompletion, maxTries,delay, progress) {
    let actionResult = null;
    if (maxTries != null) {
        actionResult = await submitAction(store, session, payload,context, maxTries, delay, progress);
    } else {
        actionResult = await apiCall(store, session.links('execute'), payload,0);
    }
    
    if (casError(actionResult) === true) {
        console.log(JSON.stringify(actionResult.items(), null,4));
        throw JSON.stringify(actionResult.items('disposition').toJS());
    }
    if (onCompletion != null) {
        onCompletion(context, actionResult);
    }
    return actionResult;
}
function casError (actionResult) {
    let statusCode =  actionResult.items('disposition', 'statusCode');
    let severity   = actionResult.items ('disposition', 'severity').toLowerCase();
    return ((statusCode !== 0) || (severity === 'error')) ? true : false;
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